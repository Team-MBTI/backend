import { GetTestInfo } from '../info/get.test.info';
import { GetTestsInfo } from '../info/get.tests.info';

export interface TestUseCase {
  getTests(): Promise<GetTestsInfo[]>;
  getTest(testId: string): Promise<GetTestInfo>;
}
