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
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CommonSuccessResponse } from '../../../common/response/common.success.response';

export type kakaoUserTypeResponse = {
  user: {
    email: string;
    nickname: string;
    accessToken: string;
    refreshToken: string;
    userId: number;
  };
};

@ApiTags('인증관련 api')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject('SessionUseCase')
    private readonly sessionUsecase: SessionUseCase,
  ) {}

  @ApiOperation({
    summary: 'accesstoken 만료시 요청하는 api',
    description:
      'cookie 에 있는 refreshToken 값을 Authorization 헤더에 Bearer 로 넣어서 요청해야된다.',
  })
  @ApiBearerAuth()
  @ApiResponse({ description: '성공응답시', type: CommonSuccessResponse })
  @Post('/access-token/restore')
  @UseGuards(AuthGuard('refresh'))
  async get(
    @Req()
    req: Request & {
      user: { email: string; nickname: string; userId: string };
    },
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

  @ApiExcludeEndpoint()
  @Get('/login/kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLoginHandler() {
    return HttpStatus.OK;
  }

  @ApiExcludeEndpoint()
  @Get('/kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async kakaoRedirectHandler(
    @Req() req: Request & kakaoUserTypeResponse,
    @Res() res: Response,
  ) {
    const loginInfo = await this.sessionUsecase.socialLogin(
      AuthDtoMapper.toSocialLoginCommand(req),
    );

    res.setHeader(
      'Access-Control-Allow-Origin',
      'http://frontend-brcip0p5c-askmeanything.vercel.app',
    );
    res.setHeader('Access-Control-Allow-Credentials', 'true');
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
    res.redirect('http://frontend-brcip0p5c-askmeanything.vercel.app');
  }

  @ApiOperation({
    summary: '로그아웃 api',
    description:
      'cookie 에 있는 accessToken 값을 Authorization 헤더에 Bearer 로 넣어서 요청해야된다.',
  })
  @ApiBearerAuth()
  @ApiResponse({ description: '성공응답시', type: CommonSuccessResponse })
  @Get('logout')
  @UseGuards(AuthGuard('access'))
  async logoutHandler(@Req() req: Request & { user: { email: string } }) {
    await this.sessionUsecase.logout(AuthDtoMapper.toLogoutCommand(req));
    return new CommonSuccessResponse(null, 'ok');
  }
}
