import { DataSource, Repository } from 'typeorm';
import {
  TestConstructorInput,
  TestDomainEntity,
} from '../domain/test.domain.entity';
import { Test } from '../domain/entity/test.entity';

export class TestRepository extends Repository<Test> {
  async findOneByTestId(testId: number): Promise<Test> {
    const test: Test = await this.findOne({
      where: { id: testId },
    });

    return test;
  }
}
