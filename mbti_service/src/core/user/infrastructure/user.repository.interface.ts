import { UserModel } from '../domain/user.model';

export interface IUserRepository {
  create(user: UserModel): Promise<number>;
  getUserByUserEmail(email: string): Promise<UserModel>;
}
