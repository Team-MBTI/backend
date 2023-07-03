import { Module } from '@nestjs/common';
import { MysqlModule } from './provider/database.module';
import { ConfigModule } from '@nestjs/config';
import { healthCheckController } from './healthcheck.contorller';
import { AuthModule } from './core/auth/auth.module';
import { UserModule } from './core/user/user.module';
import { configModuleOptions } from './provider/config.module.options';

@Module({
  imports: [
    MysqlModule,
    AuthModule,
    UserModule,
    ConfigModule.forRoot({ ...configModuleOptions }),
  ],
  controllers: [healthCheckController],
  providers: [],
})
export class AppModule {}
