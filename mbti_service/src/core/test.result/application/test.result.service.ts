import { Inject, Injectable } from '@nestjs/common';
import { TestResultUseCase } from './usecase/test.result.usecase';
import { SaveResultCommand } from './command/save.result.command';
import { ITestResultStore } from './data.access/test.result.store.interface';

@Injectable()
export class TestResultService implements TestResultUseCase {
  constructor(
    @Inject('ITestResultStore')
    private readonly testResultStore: ITestResultStore,
  ) {}

  async saveResult(command: SaveResultCommand) {
    const { userId, resultId } = command;

    await this.testResultStore.updateUserId(resultId, userId);
  }
}
