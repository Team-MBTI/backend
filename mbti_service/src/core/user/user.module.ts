import { Module } from '@nestjs/common';
import { UserRepository } from './infrastructure/user.repository';
import { UserReader } from './infrastructure/user.reader';
import { UseStore } from './infrastructure/user.store';
import { MysqlModule } from '../../provider/database.module';
import { TestResultModule } from '../test.result/test.result.module';
import { UserService } from './application/user.service';
import { UserController } from './interface/user.controller';

@Module({
  imports: [MysqlModule, TestResultModule],
  controllers: [UserController],
  providers: [
    {
      provide: 'UserUseCase',
      useClass: UserService,
    },
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
