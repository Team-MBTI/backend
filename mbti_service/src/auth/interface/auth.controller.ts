import { Controller, Get, Inject, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { loginUseCase } from '../application/usecase/login.usecase';
import { AuthDtoMapper } from './auth.dto.mapper';

export type kakaoUserTypeResponse = {
  user: {
    email: string;
    nickName: string;
    accessToken: string;
    refreshToken: string;
  };
};

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('LoginUseCase')
    private readonly loginUsecase: loginUseCase,
  ) {}

  @Get('/login/kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLoginHandler() {
    return;
  }

  @Get('/kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async kakaoRedirectHandler(
    @Req() req: Request & kakaoUserTypeResponse,
    @Res() res: Response,
  ) {
    const loginInfo = await this.loginUsecase.socialLogin(
      AuthDtoMapper.toSocialLoginCommand(req),
    );
    res.setHeader('Authorization', `Bearer ${loginInfo.accessToken}`);
    res.cookie('refresh-token', loginInfo.refreshToken, {
      path: '/',
      maxAge: 36000000,
      httpOnly: true,
    });
  }
}
