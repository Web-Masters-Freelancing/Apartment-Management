import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [PassportModule, UserModule],
  providers: [LocalStrategy],
})
export class AuthModule {}
