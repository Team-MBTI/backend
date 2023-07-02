import { QuestionVO } from '../../domain/vo/question.vo';
import { Question } from '../../infrastructure/entity/question.entity';
import { Test } from '../../infrastructure/entity/test.entity';
import { GetQuestionDto } from './get.question.dto';

export class TestResponseDto {
  private readonly id: number;
  private name: string;
  private imgUrl: string;
  private questions: Question[];

  constructor(testInfo: Test, questions: Question[]) {
    this.id = testInfo.id;
    this.name = testInfo.name;
    this.imgUrl = testInfo.imgUrl;
    this.questions = questions;
  }
}

export type CreateTestProperty = Partial<TestDtoConstructorInput>;

export type TestDtoConstructorInput = {
  id: number;
  name: string;
  imgUrl: string;
  questions: Question[];
};
