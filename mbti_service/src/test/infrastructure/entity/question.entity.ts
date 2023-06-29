import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Test } from './test.entity';

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
}
