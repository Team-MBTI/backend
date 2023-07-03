import { Module } from '@nestjs/common';
import { MysqlModule } from './provider/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { envPathGenerator } from './common/env.path.generator';
import { AuthModule } from './auth/auth.module';
import kakaoLoginConfig from './config/kakao.login.config';
import commonLoginConfig from './config/common.login.config';
import { UserModule } from './user/user.module';
import { TestModule } from './test/test.module';
import { healthCheckController } from './healthcheck.controller';

@Module({
  imports: [
    TestModule,
    MysqlModule,
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      envFilePath: [envPathGenerator()],
      load: [databaseConfig, kakaoLoginConfig, commonLoginConfig],
      isGlobal: true,
    }),
  ],
  controllers: [healthCheckController],
  providers: [],
})
export class AppModule {}
