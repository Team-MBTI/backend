import { Inject, Injectable } from '@nestjs/common';
import { TestResultModel } from '../domain/test.result.model';
import { ITestResultRepository } from './test.result.repository.interface';
import { ITestResultStore } from '../application/data.access/test.result.store.interface';
import { MBTI } from '../domain/vo/mbti.vo';

@Injectable()
export class TestResultStore implements ITestResultStore {
  constructor(
    @Inject('ITestResultRepository')
    private readonly testResultRepository: ITestResultRepository,
  ) {}
  async create(testResult: TestResultModel, mbti: MBTI) {
    await this.testResultRepository.create(testResult, mbti);
  }
}
