import { Module } from '@nestjs/common';
import { MysqlModule } from './provider/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { envPathGenerator } from './common/env.path.generator';
import { healthCheckController } from './healthcheck.controller';
import { TestModule } from './test/test.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from './common/typeorm-ex.module';

@Module({
  imports: [
    TestModule,
    MysqlModule,
    ConfigModule.forRoot({
      envFilePath: [envPathGenerator()],
      load: [databaseConfig],
      isGlobal: true,
    }),
  ],
  controllers: [healthCheckController],
  providers: [],
})
export class AppModule {}
