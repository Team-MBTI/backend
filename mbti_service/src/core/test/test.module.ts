import { Module } from '@nestjs/common';
import { TestController } from './interface/test.controller';
import { TestRepository } from './infrastructure/test.repository';
import { TestService } from './application/test.service';
import { TestReader } from './infrastructure/test.reader';
import { MysqlModule } from '../../provider/database.module';
import { TestDomainService } from './domain/test.domain.service';
import { TestResultModule } from '../test.result/test.result.module';

@Module({
  imports: [MysqlModule, TestResultModule],
  controllers: [TestController],
  providers: [
    TestDomainService,
    {
      provide: 'ITestRepository',
      useClass: TestRepository,
    },
    {
      provide: 'ITestReader',
      useClass: TestReader,
    },
    {
      provide: 'TestUseCase',
      useClass: TestService,
    },
  ],
  exports: [],
})
export class TestModule {}
