import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TestResultEntity } from './entity/test.result.entity';
import { ITestResultRepository } from './test.result.repository.interface';
import { MBTI } from '../domain/vo/mbti.vo';
import { DestinationEntity } from './entity/destination.entity';
import { TestResultModel } from '../domain/test.result.model';

@Injectable()
export class TestResultRepository implements ITestResultRepository {
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource,
  ) {}

  async create(testResult: TestResultModel, mbti: MBTI) {
    const mbtiEntity = await this.dataSource
      .createQueryBuilder(DestinationEntity, 'destination')
      .where('destination.mbti = :mbti', { mbti: mbti.key })
      .getOne();

    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(TestResultEntity)
      .values({
        ...testResult,
        destination: mbtiEntity,
      })
      .execute();
  }

  async getByUserId(userId: number) {
    const result = await this.dataSource
      .createQueryBuilder(TestResultEntity, 'result')
      .leftJoinAndSelect('result.destination', 'destination')
      .where('result.userId', { userId })
      .orderBy('createdAt', 'DESC')
      .getOne();

    if (!result) return null;
    return result.toTestResultModel();
  }

  async getDestinationByMbti(mbti: MBTI) {
    const result = await this.dataSource
      .createQueryBuilder(DestinationEntity, 'destination')
      .where('destination.mbti = :mbti', { mbti: mbti.key })
      .getOne();

    if (!result) return null;
    return result.toDestination();
  }
}
