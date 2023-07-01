import { Module } from '@nestjs/common';
import { MysqlModule } from './provider/database.module';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { envPathGenerator } from './common/env.path.generator';
import { healthCheckController } from './healthcheck.contorller';
import { AuthModule } from './auth/auth.module';
import kakaoLoginConfig from './config/kakao.login.config';

@Module({
  imports: [
    MysqlModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: [envPathGenerator()],
      load: [databaseConfig, kakaoLoginConfig],
      isGlobal: true,
    }),
  ],
  controllers: [healthCheckController],
  providers: [],
})
export class AppModule {}
