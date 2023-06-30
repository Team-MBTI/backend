import { DataSource, Repository } from 'typeorm';
import {
  TestConstructorInput,
  TestDomainEntity,
} from '../domain/test.domain.entity';
import { Test } from './entity/test.entity';
import { CustomRepository } from '../../common/decorator/typeorm-ex.decorator';
import { Question } from './entity/question.entity';

@CustomRepository(Question)
export class QuestionRepository extends Repository<Question> {
  async findAll(): Promise<Question[]> {
    return await this.find();
  }
}
