import { Module } from '@nestjs/common';
import { MysqlModule } from './provider/database.module';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    MysqlModule,
    ConfigModule.forRoot({
      envFilePath: [
        process.env.NODE_ENV === 'main'
          ? `${__dirname}/config/.main.env`
          : `${__dirname}/config/.dev.env`,
      ],
      load: [databaseConfig],
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
