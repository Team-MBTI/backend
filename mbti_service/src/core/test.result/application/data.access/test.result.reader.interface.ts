import { TestResultModel } from '../../domain/test.result.model';
import { Destination } from '../../domain/vo/destination.vo';
import { MBTI } from '../../domain/vo/mbti.vo';

export interface ITestResultReader {
  getByUserId(userId: number): Promise<TestResultModel>;
  getDestinationByMbti(mbti: MBTI): Promise<Destination>;
  getById(resultId: number): Promise<TestResultModel>;
}
