import {
  Controller,
  Get,
  Post,
  Inject,
  Req,
  Res,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { SessionUseCase } from '../application/usecase/login.usecase';
import { AuthDtoMapper } from './auth.dto.mapper';

export type kakaoUserTypeResponse = {
  user: {
    email: string;
    nickname: string;
    accessToken: string;
    refreshToken: string;
  };
};

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('SessionUseCase')
    private readonly sessionUsecase: SessionUseCase,
  ) {}

  @Post('/access-token/restore')
  @UseGuards(AuthGuard('refresh'))
  async get(
    @Req() req: Request & { user: { email: string; nickname: string } },
    @Res() res: Response,
  ) {
    const accessToken = await this.sessionUsecase.restoreAccessToken(
      AuthDtoMapper.toAccessTokenRestoreCommand(req),
    );
    res.cookie('access-token', accessToken, {
      path: '/',
      maxAge: 60 * 60 * 10,
      httpOnly: true,
    });
    res.status(200).send({ status: 'ok' });
  }

  @Get('/login/kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLoginHandler() {
    return HttpStatus.OK;
  }

  @Get('/kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async kakaoRedirectHandler(
    @Req() req: Request & kakaoUserTypeResponse,
    @Res() res: Response,
  ) {
    const loginInfo = await this.sessionUsecase.socialLogin(
      AuthDtoMapper.toSocialLoginCommand(req),
    );
    res.setHeader('Authorization', `Bearer ${loginInfo.accessToken}`);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.cookie('refresh-token', loginInfo.refreshToken, {
      path: '/',
      maxAge: 60 * 60 * 10,
      httpOnly: true,
    });
    res.cookie('access-token', loginInfo.accessToken, {
      path: '/',
      maxAge: 60 * 60 * 10,
      httpOnly: true,
    });
    res.redirect('http://localhost:3000');
  }

  @Get('logout')
  @UseGuards(AuthGuard('access'))
  async logoutHandler(
    @Req() req: Request & { user: { email: string } },
    @Res() res: Response,
  ) {
    await this.sessionUsecase.logout(AuthDtoMapper.toLogoutCommand(req));
    res.status(200).send({ status: 'ok' });
  }
}
