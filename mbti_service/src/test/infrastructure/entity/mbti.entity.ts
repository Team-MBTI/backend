import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TestResult } from './test.result.entity';

@Entity()
export class Mbti extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Mbti, (mbti) => mbti.testResults)
  testResults: TestResult[];

  @Column()
  name: string;

  @Column()
  destination: string;

  @Column()
  imgUrl: string;

  @Column()
  content: string;

  @Column()
  contentImgUrl: string;

  @Column()
  mbti: string;
}
