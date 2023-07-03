import { TestResultModel } from '../../domain/test.result.model';

export interface ITestResultStore {
  create(testResult: TestResultModel): Promise<void>;
  updateUserId(resultId: number, userId: number): Promise<void>;
}
