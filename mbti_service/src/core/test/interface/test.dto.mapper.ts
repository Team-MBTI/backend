import { TestSubmitCommand } from '../application/command/test.submit.command';
import { SubmitTestRequest } from './requetst/test.submit.request';

export class TestDtoMapper {
  static toTestSubmitCommand(testId: number, request: SubmitTestRequest) {
    return new TestSubmitCommand(testId, request.answer);
  }
}
