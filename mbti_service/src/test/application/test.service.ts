import { Inject, Injectable } from '@nestjs/common';
import { TestRepository } from '../infrastructure/test.repository';
import {
  CreateTestProperty,
  QuestionCreateSet,
  TestDomainEntity,
} from '../domain/test.domain.entity';
import { Test } from '../infrastructure/entity/test.entity';
import { DataSource } from 'typeorm';
import { Question } from '../infrastructure/entity/question.entity';
import { QuestionVO } from '../domain/vo/question.vo';
import { Transactional } from 'typeorm-transactional';
import { GetQuestionDto } from './dto/get.question.dto';
import { TestResponseDto } from './dto/get.test.response.dto';

@Injectable()
export class TestService {
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource,
  ) {}

  async getTestQuestions(testId: number) {
    const questions = await this.getQuestionsByTestId(testId); //GetQuestionDto[]
    const testInfo = await this.getTestInfo(testId); //TestResponseDto

    // const testProperties = testInfo.getTestInfoProperties();

    // console.log(testProperties.id, testProperties.imgUrl, testProperties.name);

    const res = new TestResponseDto(testInfo, questions);

    return res;
  }

  //   async getTest(testId: number) {
  //     const res = await this.dataSource
  //       .createQueryBuilder(Test, 'test')
  //       .innerJoin('question', 'question', 'test.id = question.test_id')
  //       .where('test.id = :testId', {
  //         testId,
  //       })
  //       .select([
  //         'test.id AS test_id',
  //         'test.name as test_name',
  //         'test.img_url as test_img_url',
  //         'question.question_number as question_number',
  //         'question.content as question_content',
  //       ])

  //       .getRawMany();
  //     return res;
  //   }

  async getQuestionsByTestId(testId: number) {
    const questions: Question[] = await this.dataSource
      .createQueryBuilder(Question, 'question')
      .select([
        'question.question_number',
        'question.content',
        'question.type',
        'question.choice_one_content',
        'question.choice_two_content',
      ])
      .where('question.test_id = :testId', {
        testId,
      })
      .getMany();

    console.log(questions[0].choiceOneContent);
    return questions;
  }

  async getTestInfo(testId: number) {
    const test = await this.dataSource
      .createQueryBuilder(Test, 'test')
      .select('test')
      .where('test.id = :testId', {
        testId,
      })
      .getOne();

    if (!test) {
      return null;
    }

    console.log(test.id, test.imgUrl, test.questions);

    return test;
  }
}
