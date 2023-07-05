import { Inject, Injectable } from '@nestjs/common';
import { TestResultModel } from '../domain/test.result.model';
import { ITestResultRepository } from './test.result.repository.interface';
import { ITestResultStore } from '../application/data.access/test.result.store.interface';

@Injectable()
export class TestResultStore implements ITestResultStore {
  constructor(
    @Inject('ITestResultRepository')
    private readonly testResultRepository: ITestResultRepository,
  ) {}

  async create(testResult: TestResultModel) {
    const resultId = await this.testResultRepository.create(testResult);
    return resultId;
  }

  async updateUserId(testId: number, userId: number): Promise<void> {
    await this.testResultRepository.updateUserId(testId, userId);
  }
}
