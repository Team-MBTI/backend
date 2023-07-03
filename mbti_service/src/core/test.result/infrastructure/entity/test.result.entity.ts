import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TestResultModel } from '../../domain/test.result.model';
import { DestinationEntity } from './destination.entity';

@Entity({ name: 'test_result' })
export class TestResultEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  userId: number;

  @Column()
  testId: number;

  @Column()
  EIResult: number;

  @Column()
  NSResult: number;

  @Column()
  FTResult: number;

  @Column()
  JPResult: number;

  @OneToOne(() => DestinationEntity)
  @JoinColumn()
  destination: DestinationEntity;

  @CreateDateColumn()
  createdAt: Date;

  toTestResultModelDetail() {
    return new TestResultModel({
      id: this.id,
      userId: this.userId,
      testId: this.testId,
      EIResult: this.EIResult,
      NSResult: this.NSResult,
      FTResult: this.FTResult,
      JPResult: this.JPResult,
      createdAt: this.createdAt,
      destination: this.destination.toDestination().getProperties(),
    });
  }
  toTestResultModel() {
    return new TestResultModel({
      id: this.id,
      userId: this.userId,
      testId: this.testId,
      EIResult: this.EIResult,
      NSResult: this.NSResult,
      FTResult: this.FTResult,
      JPResult: this.JPResult,
      createdAt: this.createdAt,
      destination: null,
    });
  }
}
