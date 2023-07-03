import { Inject, Injectable } from '@nestjs/common';
import { ITestResultReader } from '../application/data.access/test.result.reader.interface';
import { ITestResultRepository } from './test.result.repository.interface';
import { Destination } from '../domain/vo/destination.vo';
import { MBTI } from '../domain/vo/mbti.vo';
import { TestResultModel } from '../domain/test.result.model';

@Injectable()
export class TestResultReader implements ITestResultReader {
  constructor(
    @Inject('ITestResultRepository')
    private readonly testResultRepository: ITestResultRepository,
  ) {}

  async getById(resultId: number): Promise<TestResultModel> {
    const testResultModel = await this.testResultRepository.getById(resultId);
    return testResultModel;
  }

  async getDestinationByMbti(mbti: MBTI): Promise<Destination> {
    const destination = await this.testResultRepository.getDestinationByMbti(
      mbti,
    );
    return destination;
  }

  async getByUserId(userId: number) {
    const testResultModel = await this.testResultRepository.getByUserId(userId);
    return testResultModel;
  }
}
