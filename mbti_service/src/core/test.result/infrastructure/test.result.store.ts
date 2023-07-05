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
    return await this.testResultRepository.create(testResult);
  }

  async updateUserId(testId: number, userId: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
