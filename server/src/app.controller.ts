import {
  Body,
  Controller,
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

    res.json({ access_token });
  }

  @Post('reset-password/:token')
  async resetPassword(
    @Body() body: { password: string },
    @Param('token') token: string,
  ) {
    await this.authService.resetPassword({ password: body.password, token });
  }
}
