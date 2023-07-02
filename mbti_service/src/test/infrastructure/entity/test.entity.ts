import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from './question.entity';
import { TestDomainEntity } from '../../domain/test.domain.entity';

@Entity()
export class Test extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  imgUrl: string;

  @OneToMany(() => Test, (test) => test.questions)
  questions: Question[];

  toEntity() {
    return new TestDomainEntity({
      id: this.id,
      name: this.name,
      imgUrl: this.imgUrl,
      questions: this.questions,
    });
  }
}
