import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TestEntity } from './entity/test.entity';
import { ITestRepository } from './test.repository.interface';

@Injectable()
export class TestRepository implements ITestRepository {
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource,
  ) {}

  async getAll() {
    const tests = await this.dataSource
      .createQueryBuilder(TestEntity, 'test')
      .getMany();
    return tests.map((test) => test.toFetchTestModel());
  }

  async get(testId: string) {
    const test = await this.dataSource
      .createQueryBuilder(TestEntity, 'test')
      .leftJoinAndSelect('test.questions', 'questions')
      .where('test.id = :testId', { testId })
      .getOne();
    if (!test) return null;
    return test.toFetchTestModelDetial();
  }
}
