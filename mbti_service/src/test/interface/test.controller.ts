import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Res,
} from '@nestjs/common';
import { TestService } from '../application/test.service';
import { Test } from '../infrastructure/entity/test.entity';
import { Question } from '../infrastructure/entity/question.entity';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {
    this.testService = testService;
  }

  @Get('')
  async findAll(): Promise<Question[]> {
    return await this.testService.findAll();
  }
}
