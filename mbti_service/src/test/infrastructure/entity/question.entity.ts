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

  toDtoEntity() {
    return new QuestionVO({
      questionNumber: this.questionNumber,
      content: this.content,
      choiceOneContent: this.choiceOneContent,
      choiceTwoContent: this.choiceTwoContent,
      choiceOneScore: this.choiceOneScore,
      choiceTwoScore: this.choiceTwoScore,
      type: this.type,
    });
  }
}
