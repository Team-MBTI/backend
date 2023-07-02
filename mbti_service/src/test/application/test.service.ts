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
import { TestRequestDto } from './dto/get.test.request.dto';
import { ScoreBoard } from '../domain/vo/score.board';

@Injectable()
export class TestService {
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource,
  ) {}

  async getTestQuestions(testId: number) {
    const questions = await this.getQuestionsByTestId(testId);
    const testInfo = await this.getTestInfo(testId);
    const res = new TestResponseDto(testInfo, questions);

    return res;
  }

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
    return test;
  }

  async getTestResult(testId: number, userScores: TestRequestDto) {
    const choiceScores = await this.getScoreBoard(testId);
    const scoreBoard = new ScoreBoard(choiceScores);
    const result = scoreBoard.getTestResult(userScores.choices);
    return result;
  }

  async getScoreBoard(testId: number) {
    const scores = await this.dataSource
      .createQueryBuilder(Question, 'question')
      .where('question.test_id = :testId', {
        testId,
      })
      .getMany();
    return scores.map((s) => s.toRequestEntity());
  }
}
