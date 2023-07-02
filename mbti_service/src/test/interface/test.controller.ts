import {
  Controller,
  Get,
  Post,
  HttpCode,
  Param,
  Body,
  ParseIntPipe,
  Res,
} from '@nestjs/common';
import { TestService } from '../application/test.service';
import { Test } from '../infrastructure/entity/test.entity';
import { TestDomainEntity } from '../domain/test.domain.entity';
import { CommonResponse } from '../../common/response/common.response.interface';
import { TestRequestDto } from '../application/dto/get.test.request.dto';

@Controller('tests')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get(':id')
  @HttpCode(200)
  async getTestQuestions(@Param('id') id: number): Promise<CommonResponse> {
    const data = await this.testService.getTestQuestions(id);
    return {
      statusCode: 200,
      message: '테스트 문항 조회에 성공하였습니다.',
      data: data,
    };
  }

  @Post(':id/results')
  async getTestResult(
    @Param('id') id: number,
    @Body() testRequestDto: TestRequestDto,
  ) {
    const data = await this.testService.getTestResult(id, testRequestDto);
    return {
      statusCode: 200,
      message: '테스트 결과 조회에 성공하였습니다.',
      data: data,
    };
  }
}
