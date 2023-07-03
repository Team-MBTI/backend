import { Inject, Injectable } from '@nestjs/common';
import { ITestRepository } from './test.repository.interface';
import { ITestReader } from '../application/outport/data.access/test.reader.interface';

@Injectable()
export class TestReader implements ITestReader {
  constructor(
    @Inject('ITestRepository')
    private readonly testRepository: ITestRepository,
  ) {}
  async get(testId: number) {
    const testModel = await this.testRepository.get(testId);
    return testModel;
  }
  async getAll() {
    const testModels = await this.testRepository.getAll();
    return testModels;
  }
}
