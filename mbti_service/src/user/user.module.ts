import { Module } from '@nestjs/common';
import { UserRepository } from './infrastructure/user.repository';
import { UserReader } from './infrastructure/user.reader';
import { UseStore } from './infrastructure/user.store';
import { MysqlModule } from '../provider/database.module';

@Module({
  imports: [MysqlModule],
  controllers: [],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'IUserReader',
      useClass: UserReader,
    },
    {
      provide: 'IUserStore',
      useClass: UseStore,
    },
  ],
  exports: ['IUserReader', 'IUserStore'],
})
export class UserModule {}
