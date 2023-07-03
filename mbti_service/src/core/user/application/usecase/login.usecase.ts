import { GetUserTestResultInfo } from '../info/user.get.test.result.info';

export interface UserUseCase {
  getResult(userId: number): Promise<GetUserTestResultInfo>;
}
