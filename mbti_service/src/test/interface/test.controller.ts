import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Res,
} from '@nestjs/common';
import { TestService } from '../application/test.service';
import { Test } from '../domain/entity/test.entity';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get(':id')
  async findOneByTestId(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Test> {
    return await this.testService.findOneByTestId(id);
  }
}
