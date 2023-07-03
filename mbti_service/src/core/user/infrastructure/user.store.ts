import { Inject, Injectable } from '@nestjs/common';
import { IUserStore } from '../application/outport/data.access/user.store.interface';
import { IUserRepository } from './user.repository.interface';
import { UserModel } from '../domain/user.model';

@Injectable()
export class UseStore implements IUserStore {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async create(user: UserModel) {
    await this.userRepository.create(user);
  }
}
