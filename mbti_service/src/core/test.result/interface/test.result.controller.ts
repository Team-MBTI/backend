import {
  Controller,
  Inject,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TestResultUseCase } from '../application/usecase/test.result.usecase';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { TestResultDtoMapper } from './test.result.dto.mapper';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CommonSuccessResponse } from '../../../common/response/common.success.response';

@ApiTags('test result 관련 api')
@Controller('test-results')
export class TestResultController {
  constructor(
    @Inject('TestResultUseCase')
    private readonly testResultUseCase: TestResultUseCase,
  ) {}

  @ApiOperation({
    summary: '결과 반환 후 로그인을 한 상황에서 결과 저장하려는 api',
    description:
      'accessToken 값을 Authorization 헤더의 Bearer 로 요청해야된다.',
  })
  @ApiBearerAuth()
  @ApiResponse({ description: '성공응답시', type: CommonSuccessResponse })
  @UseGuards(AuthGuard('access'))
  @Post(':resultId/save')
  async saveResult(
    @Param('resultId') resultId: number,
    @Req() req: Request & { user: { userId: string } },
  ) {
    await this.testResultUseCase.saveResult(
      TestResultDtoMapper.toSaveResult(req, resultId),
    );

    return new CommonSuccessResponse(null, 'ok');
  }
}
