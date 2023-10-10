import { Controller, Get } from '@nestjs/common';
import { LoggedInUser } from '../auth/decorators/logged-in-user.decorator';
import { LoginByUsernameAndPassword } from './user.service';

@Controller('user')
export class UserController {
  @Get('me')
  login(@LoggedInUser() user: LoginByUsernameAndPassword) {
    return user;
  }
}
