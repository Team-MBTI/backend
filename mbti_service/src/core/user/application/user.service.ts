import { Inject, Injectable } from '@nestjs/common';
import { UserUseCase } from './usecase/login.usecase';
import { ITestResultReader } from '../../test.result/application/data.access/test.result.reader.interface';
import { GetUserTestResultInfo } from './info/user.get.test.result.info';

@Injectable()
export class UserService implements UserUseCase {
  constructor(
    @Inject('ITestResultReader')
    private readonly testResultReader: ITestResultReader,
  ) {}

  async getResult(userId: number) {
    const result = await this.testResultReader.getByUserId(userId);
    return new GetUserTestResultInfo(result);
  }
}
