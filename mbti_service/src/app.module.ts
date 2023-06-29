import { Module } from '@nestjs/common';
import { MysqlModule } from './provider/database.module';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { envPathGenerator } from './common/env.path.generator';
import { healthCheckController } from './healthcheck.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MysqlModule,
    TerminusModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
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
