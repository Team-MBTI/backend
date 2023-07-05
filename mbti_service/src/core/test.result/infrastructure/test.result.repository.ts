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

  async create(testResult: TestResultModel) {
    const mbti = testResult.getProperteis().destination.mbti.key;

    const destinationEntity = await this.dataSource
      .createQueryBuilder(DestinationEntity, 'destination')
      .where('destination.mbti = :mbti', {
        mbti,
      })
      .getOne();

    let insertResult = await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(TestResultEntity)
      .values({
        ...testResult,
        destination: destinationEntity,
      })
      .execute();

    return insertResult.generatedMaps[0].id;
  }

  async getByUserId(userId: number) {
    const result = await this.dataSource
      .createQueryBuilder(TestResultEntity, 'result')
      .leftJoinAndSelect('result.destination', 'destination')
      .where('result.userId', { userId })
      .orderBy('createdAt', 'DESC')
      .getOne();

    if (!result) return null;
    return result.toTestResultModelDetail();
  }

  async getDestinationByMbti(mbti: MBTI) {
    const result = await this.dataSource
      .createQueryBuilder(DestinationEntity, 'destination')
      .where('destination.mbti = :mbti', { mbti: mbti.key })
      .getOne();

    if (!result) return null;
    return result.toDestination();
  }

  async getById(resultId: number): Promise<TestResultModel> {
    const result = await this.dataSource
      .createQueryBuilder(TestResultEntity, 'result')
      .where('result.id', { id: resultId })
      .getOne();

    if (!result) return null;
    return result.toTestResultModel();
  }

  async updateUserId(testId: number, userId: number): Promise<void> {
    await this.dataSource
      .createQueryBuilder()
      .update<TestResultEntity>(TestResultEntity)
      .set({ userId })
      .where('id = :testId', { testId })
      .execute();
  }
}
