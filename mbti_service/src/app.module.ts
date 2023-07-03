import { Module } from '@nestjs/common';
import { MysqlModule } from './provider/database.module';
import { ConfigModule } from '@nestjs/config';
import { healthCheckController } from './healthcheck.contorller';
import { AuthModule } from './core/auth/auth.module';
import { UserModule } from './core/user/user.module';
import { configModuleOptions } from './provider/config.module.options';
import { TestResultModule } from './core/test.result/test.result.module';
import { TestModule } from './core/test/test.module';

@Module({
  imports: [
    MysqlModule,
    AuthModule,
    UserModule,
    TestResultModule,
    TestModule,
    ConfigModule.forRoot({ ...configModuleOptions }),
  ],
  controllers: [healthCheckController],
  providers: [],
})
export class AppModule {}
