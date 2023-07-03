import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TestEntity } from './test.entity';
import { Question } from '../../domain/vo/question.vo';
import { MBTIPartial } from '../../domain/vo/mbti.partial.vo';

@Entity({ name: 'question' })
export class QuestionEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

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

  @ManyToOne(() => TestEntity)
  test: TestEntity;

  @CreateDateColumn()
  createdAt: Date;

  toQuestionModel() {
    return new Question({
      questionNumber: this.questionNumber,
      content: this.content,
      type: MBTIPartial.valueOf(this.type),
      choiceOneContent: this.choiceOneContent,
      choiceOneScore: this.choiceOneScore,
      choiceTwoContent: this.choiceTwoContent,
      choiceTwoScore: this.choiceTwoScore,
    });
  }
}
