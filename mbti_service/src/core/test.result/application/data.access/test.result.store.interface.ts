import { TestResultModel } from '../../domain/test.result.model';

export interface ITestResultStore {
  create(testResult: TestResultModel): Promise<number>;
  updateUserId(resultId: number, userId: number): Promise<void>;
}
