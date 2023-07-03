import { Controller, Get, Inject, Param, Body, Post } from '@nestjs/common';
import { TestUseCase } from '../application/usecase/test.usecase';
import { GetTestsResponse } from './response/get.tests.response';
import { GetTestResponse } from './response/get.test.response';
import { CommonSuccessResponse } from '../../../common/response/common.success.response';
import { SubmitTestRequest } from './requetst/test.submit.request';
import { TestDtoMapper } from './test.dto.mapper';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SubmitTestResponse } from './response/submit.test.response';
import { ApiSuccessResponseDto } from '../../../common/decorator/swagger.common.response.decorator';

@ApiTags('TEST 관련 api')
@Controller('tests')
export class TestController {
  constructor(
    @Inject('TestUseCase')
    private readonly testUseCase: TestUseCase,
  ) {}

  @ApiOperation({
    summary: '테스트 리스트 fetch API',
    description: 'Test 목록을 가져오는 api 이다.',
  })
  @ApiResponse({
    description: '성공응답시',
    type: CommonSuccessResponse<GetTestsResponse[]>,
  })
  @ApiSuccessResponseDto(GetTestsResponse)
  @Get()
  async getTests() {
    const infos = await this.testUseCase.getTests();
    const responses = infos.map((info) => new GetTestsResponse(info));
    return new CommonSuccessResponse(responses, 'ok');
  }

  @ApiOperation({
    summary: '테스트 세부 fetch API',
    description: 'testId 에 해당하는 TestSet 을 가져오는 API 이다.',
  })
  @ApiResponse({
    description: '성공응답시',
    type: CommonSuccessResponse<GetTestResponse>,
  })
  @ApiSuccessResponseDto(GetTestResponse)
  @Get(':testId')
  async getTest(@Param('testId') testId: number) {
    const info = await this.testUseCase.getTest(testId);
    const response = new GetTestResponse(info);
    return new CommonSuccessResponse(response, 'ok');
  }

  @ApiOperation({
    summary: '테스트 제출 API',
    description: 'testId 에 해당하는 test 를 제출하는 API.',
  })
  @ApiResponse({
    description: '성공응답시',
    type: CommonSuccessResponse<SubmitTestResponse>,
  })
  @ApiSuccessResponseDto(SubmitTestResponse)
  @Post(':testId/submit')
  async submitTest(
    @Param('testId') testId: number,
    @Body() submitTestRequest: SubmitTestRequest,
  ) {
    const info = await this.testUseCase.submitTest(
      TestDtoMapper.toTestSubmitCommand(testId, submitTestRequest),
    );
    const response = new SubmitTestResponse(info);
    return new CommonSuccessResponse(response, 'created');
  }
}
