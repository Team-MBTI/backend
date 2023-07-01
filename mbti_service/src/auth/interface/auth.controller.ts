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
    @Inject('loginUseCase')
    private readonly loginUsecase: loginUseCase,
  ) {}

  @Get('/login/kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLoginHandler() {}

  @Get('/kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async kakaoRedirectHandler(
    @Req() req: Request & kakaoUserTypeResponse,
    @Res() res: Response,
  ) {
    const loginInfo = await this.loginUsecase.socialLogin(
      AuthDtoMapper.toSocialLoginCommand(req),
    );
    return loginInfo;
  }
}
