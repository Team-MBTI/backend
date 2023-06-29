import { Dependencies, Injectable } from '@nestjs/common';
import { TestRepository } from '../infrastructure/test.repository';
import { TestDomainEntity } from '../domain/test.domain.entity';
import { Test } from '../domain/entity/test.entity';

@Injectable()
export class TestService {
  constructor(private readonly testRepository: TestRepository) {}

  async findOneByTestId(testId: number): Promise<Test> {
    const test = await this.findOneByTestId(testId);

    return test;
  }
}
