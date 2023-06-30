import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestController } from './interface/test.controller';
import { TestService } from './application/test.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MysqlModule } from '../provider/database.module';
import { Test } from './infrastructure/entity/test.entity';
import { TypeOrmExModule } from '../common/typeorm-ex.module';
import { mysqlProvider } from '../provider/mysql.provider';
import { Question } from './infrastructure/entity/question.entity';
import { QuestionRepository } from './infrastructure/question.repository';

@Module({
  imports: [
    MysqlModule,
    TypeOrmExModule.forCustomRepository([QuestionRepository]),
  ],
  controllers: [TestController],
  providers: [TestService, QuestionRepository],
  exports: [TestService],
})
export class TestModule {}
