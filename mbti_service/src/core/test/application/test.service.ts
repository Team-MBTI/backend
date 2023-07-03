import { Inject, Injectable } from '@nestjs/common';
import { TestUseCase } from './usecase/test.usecase';
import { ITestReader } from './outport/data.access/test.reader.interface';
import { GetTestsInfo } from './info/get.tests.info';
import { GetTestInfo } from './info/get.test.info';

@Injectable()
export class TestService implements TestUseCase {
  constructor(
    @Inject('ITestReader')
    private readonly testReader: ITestReader,
  ) {}

  async getTests() {
    const testModels = await this.testReader.getAll();
    return testModels.map((testModel) => new GetTestsInfo(testModel));
  }

  async getTest(testId: string) {
    const testModel = await this.testReader.get(testId);
    return new GetTestInfo(testModel);
  }
}
