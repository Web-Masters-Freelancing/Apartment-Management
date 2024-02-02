import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) res: Response) {
    const { access_token } = await this.authService.login(req.user);

    // Automatically attach access_token to cookie
    res
      .cookie('access_token', access_token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        expires: new Date(Date.now() + 1 * 24 * 60 * 1000), // 1Day, if you update this, please match this to token expiry in auth.module
      })
      .send({ status: 'ok' });
  }

  @Post('reset-password/:token')
  async resetPassword(
    @Body() body: { password: string },
    @Param('token') token: string,
  ) {
    await this.authService.resetPassword({ password: body.password, token });
  }
}
