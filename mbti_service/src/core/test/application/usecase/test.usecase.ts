import { TestSubmitCommand } from '../command/test.submit.command';
import { GetTestInfo } from '../info/get.test.info';
import { GetTestsInfo } from '../info/get.tests.info';

export interface TestUseCase {
  getTests(): Promise<GetTestsInfo[]>;
  getTest(testId: number): Promise<GetTestInfo>;
  submitTest(command: TestSubmitCommand): Promise<void>;
}
