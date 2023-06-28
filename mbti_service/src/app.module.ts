import { Module } from '@nestjs/common';
import { MysqlModule } from './provider/database.module';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { envPathGenerator } from './common/env.path.generator';

@Module({
  imports: [
    MysqlModule,
    ConfigModule.forRoot({
      envFilePath: [envPathGenerator()],
      load: [databaseConfig],
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
