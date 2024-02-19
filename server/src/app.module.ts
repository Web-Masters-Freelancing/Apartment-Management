import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { RoomModule } from './room/room.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronjobService } from './cronjob/cronjob.service';
import { TwilioService } from './twilio/twilio.service';
import { BillableService } from './billable/billable.service';
import { BillableModule } from './billable/billable.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    ConfigModule.forRoot(),
    RoomModule,
    ScheduleModule.forRoot(),
    BillableModule,
  ],
  controllers: [AppController],
  providers: [AppService, CronjobService, TwilioService, BillableService],
})
export class AppModule {}
