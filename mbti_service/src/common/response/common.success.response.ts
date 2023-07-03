import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { GetTestResponse } from '../../core/test/interface/response/get.test.response';
import { GetTestsResponse } from '../../core/test/interface/response/get.tests.response';
import { SubmitTestResponse } from '../../core/test/interface/response/submit.test.response';
import { GetUserTestResultResponse } from '../../core/user/interface/response/get.user.test.result.response';

@ApiExtraModels(
  GetTestResponse,
  GetTestsResponse,
  SubmitTestResponse,
  GetUserTestResultResponse,
)
export class CommonSuccessResponse<T> {
  @ApiProperty({
    description: 'status 에 해당하는 정보',
    example: 'ok',
  })
  status: string;
  data: T;

  constructor(data: T, status) {
    this.status = status;
    this.data = data;
  }
}
