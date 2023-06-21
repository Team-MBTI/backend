import { Module } from '@nestjs/common';
import { MysqlModule } from './provider/database.module';

@Module({
  imports: [MysqlModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
