import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Test } from './test.entity';
import { TestDomainEntity } from '../../domain/test.domain.entity';
import { QuestionVO } from './../../domain/vo/question.vo';
import { GetQuestionDto } from '../../application/dto/get.question.dto';
import { TestRequestDto } from '../../application/dto/get.test.request.dto';
import { ChoiceScore } from '../../domain/vo/choice.score';

@Entity()
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Test, (test) => test.questions)
  test: Test;

  @Column()
  questionNumber: number;

  @Column()
  content: string;

  @Column()
  type: string;

  @Column()
  choiceOneContent: string;

  @Column()
  choiceOneScore: number;

  @Column()
  choiceTwoContent: string;

  @Column()
  choiceTwoScore: number;

  toRequestEntity() {
    return new ChoiceScore(
      this.id,
      this.choiceOneScore,
      this.choiceTwoScore,
      this.type,
    );
  }
}
