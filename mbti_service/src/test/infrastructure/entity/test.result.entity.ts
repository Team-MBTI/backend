import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Mbti } from './mbti.entity';

@Entity()
export class TestResult extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TestResult, (testResult) => testResult.mbti)
  mbti: Mbti;

  @Column()
  name: string;

  @Column()
  content: string;

  @Column()
  imgUrl: string;

  @Column()
  userId: number;

  @Column()
  EIResult: string;

  @Column()
  NSResult: string;

  @Column()
  FTResult: string;

  @Column()
  JPResult: string;
}
