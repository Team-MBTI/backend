import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserUseCase } from '../application/usecase/login.usecase';
import { CommonSuccessResponse } from '../../../common/response/common.success.response';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUserTestResultResponse } from './response/get.user.test.result.response';
import { ApiSuccessResponseDto } from '../../../common/decorator/swagger.common.response.decorator';

@ApiTags('user 정보 관련 API')
@Controller('users')
export class UserController {
  constructor(
    @Inject('UserUseCase')
    private readonly userUseCase: UserUseCase,
  ) {}

  @ApiOperation({
    summary: '유저가 저장하기한 결과값을 반환',
    description:
      'cookie 에 있는 accessToken 값을 Authorization 헤더에 Bearer 로 넣어서 요청해야된다.',
  })
  @ApiBearerAuth()
  @ApiSuccessResponseDto(GetUserTestResultResponse)
  @Get('/results')
  @UseGuards(AuthGuard('access'))
  async getTestResultHandler(
    @Req() req: Request & { user: { userId: number } },
  ) {
    const info = await this.userUseCase.getResult(req.user.userId);
    const response = new GetUserTestResultResponse(info);
    return new CommonSuccessResponse(response, 'ok');
  }
}
