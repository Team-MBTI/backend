import { Module } from '@nestjs/common';
import { TestResultReader } from './infrastructure/test.result.reader';
import { TestResultRepository } from './infrastructure/test.result.repository';
import { TestResultStore } from './infrastructure/test.result.store';
import { MysqlModule } from '../../provider/database.module';
import { TestResultService } from './application/test.result.service';
import { TestResultController } from './interface/test.result.controller';

@Module({
  imports: [MysqlModule],
  controllers: [TestResultController],
  providers: [
    {
      provide: 'TestResultUseCase',
      useClass: TestResultService,
    },
    {
      provide: 'ITestResultReader',
      useClass: TestResultReader,
    },
    {
      provide: 'ITestResultStore',
      useClass: TestResultStore,
    },
    {
      provide: 'ITestResultRepository',
      useClass: TestResultRepository,
    },
  ],
  exports: ['ITestResultReader', 'ITestResultStore'],
})
export class TestResultModule {}
