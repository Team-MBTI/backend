import { Inject, Injectable } from '@nestjs/common';
import { TestUseCase } from './usecase/test.usecase';
import { ITestReader } from './outport/data.access/test.reader.interface';
import { GetTestsInfo } from './info/get.tests.info';
import { GetTestInfo } from './info/get.test.info';
import { TestSubmitCommand } from './command/test.submit.command';
import { TestDomainService } from '../domain/test.domain.service';
import { ITestResultStore } from '../../test.result/application/data.access/test.result.store.interface';
import { ITestResultReader } from '../../test.result/application/data.access/test.result.reader.interface';
import { SubmitTestInfo } from './info/submit.test.info';

@Injectable()
export class TestService implements TestUseCase {
  constructor(
    @Inject('ITestReader')
    private readonly testReader: ITestReader,
    @Inject('ITestResultStore')
    private readonly testResultStore: ITestResultStore,
    @Inject('ITestResultReader')
    private readonly testResultReader: ITestResultReader,
    private readonly testDomianService: TestDomainService,
  ) {}

  async getTests() {
    const testModels = await this.testReader.getAll();
    return testModels.map((testModel) => new GetTestsInfo(testModel));
  }

  async getTest(testId: number) {
    const testModel = await this.testReader.get(testId);
    return new GetTestInfo(testModel);
  }

  async submitTest(command: TestSubmitCommand) {
    const { testId, answers } = command;
    const test = await this.testReader.get(testId);
    const { mbti, ...score } = this.testDomianService.calculateResult(
      answers,
      test,
    );
    const destination = await this.testResultReader.getDestinationByMbti(mbti);
    const testResult = this.testDomianService.createResult(
      score,
      testId,
      destination,
    );
    const resultId = await this.testResultStore.create(testResult);
    return new SubmitTestInfo(resultId, testResult);
  }
}
