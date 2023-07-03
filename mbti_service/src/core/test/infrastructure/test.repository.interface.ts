import { TestModel } from '../domain/test.model';

export interface ITestRepository {
  getAll(): Promise<TestModel[]>;
  get(testId: string): Promise<TestModel>;
}
