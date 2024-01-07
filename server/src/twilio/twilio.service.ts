import { Injectable } from '@nestjs/common';
import * as twilio from 'twilio';

interface TwilioConfig {
  accountSid: string;
  authToken: string;
  twilioPhoneNumber: string;
}

@Injectable()
export class TwilioService {
  private readonly twilioClient: twilio.Twilio;
  private readonly config: TwilioConfig;

  constructor() {
    this.config = {
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
      twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER,
    };
    this.twilioClient = twilio(this.config.accountSid, this.config.authToken);
  }

  async sendSms(to: string, body: string): Promise<void> {
    await this.twilioClient.messages.create({
      body,
      from: this.config.twilioPhoneNumber,
      to,
    });
  }
}
