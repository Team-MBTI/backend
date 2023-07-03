import {
  Controller,
  Get,
  Inject,
  Param,
  Res,
  Body,
  Post,
} from '@nestjs/common';
import { TestUseCase } from '../application/usecase/test.usecase';
import { Response } from 'express';
import { GetTestsResponse } from './response/get.tests.response';
import { GetTestResponse } from './response/get.test.response';
import { CommonSuccessResponse } from '../../../common/response/common.success.response';
import { SubmitTestRequest } from './requetst/test.submit.request';
import { TestDtoMapper } from './test.dto.mapper';

@Controller('tests')
export class TestController {
  constructor(
    @Inject('TestUseCase')
    private readonly testUseCase: TestUseCase,
  ) {}

  @Get()
  async getTests(@Res() res: Response) {
    const infos = await this.testUseCase.getTests();
    const responses = infos.map((info) => new GetTestsResponse(info));
    res.status(200).send(new CommonSuccessResponse(responses, 'ok'));
  }

  @Get(':testId')
  async getTest(@Param('testId') testId: number, @Res() res: Response) {
    const info = await this.testUseCase.getTest(testId);
    const response = new GetTestResponse(info);
    res.status(200).send(new CommonSuccessResponse(response, 'ok'));
  }

  @Post(':testId/submit')
  async submitTest(
    @Param('testId') testId: number,
    @Body() submitTestRequest: SubmitTestRequest,
    @Res() res: Response,
  ) {
    await this.testUseCase.submitTest(
      TestDtoMapper.toTestSubmitCommand(testId, submitTestRequest),
    );
    res.status(201).send(new CommonSuccessResponse(null, 'created'));
  }
}
