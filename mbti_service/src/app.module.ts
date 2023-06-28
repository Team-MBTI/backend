import { Module } from '@nestjs/common';
import { MysqlModule } from './provider/database.module';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { envPathGenerator } from './common/env.path.generator';
import { healthCheckController } from './healthcheck.contorller';

@Module({
  imports: [
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
