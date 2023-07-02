import {
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Res,
} from '@nestjs/common';
import { TestService } from '../application/test.service';
import { Test } from '../infrastructure/entity/test.entity';
import { TestDomainEntity } from '../domain/test.domain.entity';
import { CommonResponse } from '../../common/response/common.response.interface';

@Controller('tests')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get(':id')
  @HttpCode(200)
  async getTestQuestions(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<CommonResponse> {
    const data = await this.testService.getTestQuestions(id);
    return {
      statusCode: 200,
      message: '테스트 문항 조회에 성공하였습니다.',
      data: data,
    };
  }
}
