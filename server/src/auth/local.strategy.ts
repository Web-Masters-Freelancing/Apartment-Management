import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({ usernameField: 'username', passReqToCallback: true });
  }

  async validate({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    return;
  }
}
