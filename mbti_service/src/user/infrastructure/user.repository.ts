import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserModel } from '../domain/user.model';
import { UserEntity } from './entity/user.entity';
import { IUserRepository } from './user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource,
  ) {}

  async create(user: UserModel) {
    const { id, ...properties } = user.getProperties();
    console.log('prop', properties);
    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values({ ...properties })
      .execute();
  }

  async getUserByUserEmail(email: string) {
    const user = await this.dataSource
      .createQueryBuilder(UserEntity, 'user')
      .where('user.email = :email', { email })
      .getOne();
    if (!user) return null;
    return user.toModel();
  }
}
