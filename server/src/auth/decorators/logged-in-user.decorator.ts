import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import type { LoginByUsernameAndPassword } from 'src/user/user.service';

export const LoggedInUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user as LoginByUsernameAndPassword;
});
