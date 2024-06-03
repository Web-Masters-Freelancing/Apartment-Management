import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TwilioService } from '../twilio/twilio.service';
import { BillableService } from '../billable/billable.service';
import { User } from '@prisma/client';

interface BillableUsers {
  user: Pick<User, 'contact' | 'name'>;
}

interface sendNotifPayload {
  data: BillableUsers[];
  type: 'before' | 'after' | 'payment';
}
const twilioService = new TwilioService();

// SendSms
export const sendNotification = async ({ data, type }: sendNotifPayload) => {
  const logger = new Logger(CronjobService.name);
  logger.debug(
    `Sending notification to these numbers: ${data
      .map((billable) => billable.user.contact)
      .join(', ')}\n\n`,
  );
  for (const dues of data) {
    const {
      user: { contact: receiverPhoneNumber, name },
    } = dues;

    const message =
      type === 'before'
        ? `Hello ${name}, this is a reminder that your rent is due in 3 days, please settle your bills before the due date to avoid penalties, thank you!`
        : type === 'after'
        ? `Hello ${name}, this is a reminder that your rent is past due for 1 day, please settle your bills to avoid penalties, thank you!`
        : `Dear ${name}, Your payment transactions is successfull. To confirm, contact the tenant holder. Thank you`;

    await twilioService.sendSms(receiverPhoneNumber, message);

    logger.debug(`Notification is sent to ${receiverPhoneNumber}`);
  }
  logger.debug(
    `\n\nDone sending SMS notifications for all billables ${type} their due.`,
  );
};

@Injectable()
export class CronjobService {
  private readonly logger = new Logger(CronjobService.name);

  constructor(private readonly billableService: BillableService) {}

  /**
   * This cronjob will run every minute (for testing purposes)
   * Update this to use '0 0 * * *', to run the cronjob daily
   * To test this, replace cron value to '1 * * * *'
   */
  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async handleCron() {
    this.logger.debug('Starting to execute scheduled task...');

    /**
     * beforeDueBillables is set to count 3 days before the actual due date
     * afterDueBillables is set to count 1 day after the actual due date
     */
    const [beforeDueBillables, afterDueBillables] = await Promise.all([
      this.billableService.findDue({ type: 'BeforeDue' }),
      this.billableService.findDue({ type: 'AfterDue' }),
    ]);

    try {
      if (beforeDueBillables.length) {
        await sendNotification({
          data: beforeDueBillables,
          type: 'before',
        });
      }

      if (afterDueBillables.length) {
        await sendNotification({
          data: afterDueBillables,
          type: 'after',
        });
        //

        /**
         * Create Bill here
         * Before 3 days of  due date
         */
        const bills = afterDueBillables.map((billable) => {
          const { id: billableId, payments, room } = billable;
          const [recentPaymentsOne, recentPaymentsTwo] = payments.sort((a, b) =>
            a.paidOn > b.paidOn ? -1 : 1,
          );

          let amountDue = room.amount; // Room price

          /**
           * If balance is not equal to zero
           * then add to the price of room
           */
          if (recentPaymentsOne.balance) {
            amountDue = room.amount + recentPaymentsOne.balance;
          }

          let advancePayment = recentPaymentsOne.advancePayment;

          /**
           * Add two advancePayment if it consecutives exist in a row
           */
          if (
            recentPaymentsOne.advancePayment &&
            recentPaymentsTwo.advancePayment
          ) {
            advancePayment =
              recentPaymentsOne.advancePayment +
              recentPaymentsTwo.advancePayment;
          }
          if (amountDue > advancePayment) {
            amountDue = amountDue - advancePayment;
          }

          if (advancePayment > amountDue) {
            amountDue = 0;
            advancePayment = advancePayment - amountDue;
          }

          return {
            billableId,
            amountDue,
            advancePayment,
            balance: amountDue,
            amountPaid: 0,
          };
        });

        if (bills && bills.length) {
          await this.billableService.createBill(bills);
        }
      }
    } catch (error) {
      this.logger.error(`Error sending SMS: ${error.message}`);
    }

    this.logger.debug('Ending execution of scheduled task...');
  }
}
