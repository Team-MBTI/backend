import { TestModel } from '../domain/test.model';

export interface ITestRepository {
  getAll(): Promise<TestModel[]>;
  get(testId: number): Promise<TestModel>;
}
