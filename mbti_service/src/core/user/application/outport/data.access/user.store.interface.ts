import { UserModel } from '../../../domain/user.model';

export interface IUserStore {
  create(user: UserModel): Promise<number>;
}
