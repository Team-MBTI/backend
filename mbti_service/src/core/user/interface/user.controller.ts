import { Controller, Get, Inject, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { UserUseCase } from '../application/usecase/login.usecase';
import { CommonSuccessResponse } from '../../../common/response/common.success.response';

@Controller('users')
export class UserController {
  constructor(
    @Inject('UserUseCase')
    private readonly userUseCase: UserUseCase,
  ) {}

  @Get('/results')
  @UseGuards(AuthGuard('access'))
  async getTestResultHandler(
    @Req() req: Request & { user: { userId: number } },
    @Res() res: Response,
  ) {
    const info = await this.userUseCase.getResult(req.user.userId);
    res.status(200).send(new CommonSuccessResponse(info, 'ok'));
  }
}
