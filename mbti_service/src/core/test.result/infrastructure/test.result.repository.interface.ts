import { TestResultModel } from '../domain/test.result.model';
import { Destination } from '../domain/vo/destination.vo';
import { MBTI } from '../domain/vo/mbti.vo';

export interface ITestResultRepository {
  getByUserId(userId: number): Promise<TestResultModel>;
  create(testResult: TestResultModel): Promise<number>;
  getDestinationByMbti(mbti: MBTI): Promise<Destination>;
  getById(resultId: number): Promise<TestResultModel>;
  updateUserId(testId: number, userId: number): Promise<void>;
}
