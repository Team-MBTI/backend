import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { TestModel } from '../../domain/test.model';
import { QuestionEntity } from './question.entity';

@Entity({ name: 'test' })
export class TestEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  imgUrl: string;

  @OneToMany(() => QuestionEntity, (question) => question.test, {
    cascade: true,
  })
  questions: QuestionEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  public toFetchTestModel() {
    return new TestModel({
      id: this.id,
      name: this.name,
      imgUrl: this.imgUrl,
      questions: null,
    });
  }

  public toFetchTestModelDetial() {
    return new TestModel({
      id: this.id,
      name: this.name,
      imgUrl: this.imgUrl,
      questions: this.questions.map((question) =>
        question.toQuestionModel().getProperties(),
      ),
    });
  }
}
