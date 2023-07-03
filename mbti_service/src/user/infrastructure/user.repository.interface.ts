import { UserModel } from '../domain/user.model';

export interface IUserRepository {
  create(user: UserModel): Promise<void>;
  getUserByUserEmail(email: string): Promise<UserModel>;
}
