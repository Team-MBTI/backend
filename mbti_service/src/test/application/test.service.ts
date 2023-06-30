import { Dependencies, Injectable } from '@nestjs/common';
import { Test } from '../infrastructure/entity/test.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/index';
import { QuestionRepository } from '../infrastructure/question.repository';
import { Question } from '../infrastructure/entity/question.entity';

@Injectable()
export class TestService {
  constructor(private questionRepository: QuestionRepository) {}

  async findAll(): Promise<Question[]> {
    return await this.questionRepository.find();
  }
}
