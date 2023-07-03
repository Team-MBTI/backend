import { TestResultModel } from '../../domain/test.result.model';
import { MBTI } from '../../domain/vo/mbti.vo';

export interface ITestResultStore {
  create(testResult: TestResultModel, mbti: MBTI): Promise<void>;
}
