import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestRepository } from './infrastructure/test.repository';
import { TestController } from './interface/test.controller';
import { TestService } from './application/test.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
