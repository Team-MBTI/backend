import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestRepository } from './infrastructure/test.repository';
import { TestController } from './interface/test.controller';
import { TestService } from './application/test.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('host'),
        port: configService.get('port'),
        username: configService.get('user'),
        password: configService.get('password'),
        database: configService.get('db'),
        synchronize: configService.get('synchronize'),
      }),
    }),
  ],
  controllers: [TestController],
  providers: [TestService, TestRepository],
})
export class TestModule {}
