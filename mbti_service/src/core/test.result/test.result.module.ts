import { Module } from '@nestjs/common';
import { TestResultReader } from './infrastructure/test.result.reader';
import { TestResultRepository } from './infrastructure/test.result.repository';
import { TestResultStore } from './infrastructure/test.result.store';
import { MysqlModule } from '../../provider/database.module';

@Module({
  imports: [MysqlModule],
  controllers: [],
  providers: [
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
  exports: ['ITestResultReader'],
})
export class TestResultModule {}
