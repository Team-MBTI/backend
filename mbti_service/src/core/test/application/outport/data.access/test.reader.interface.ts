import { TestModel } from '../../../domain/test.model';

export interface ITestReader {
  get(testId: number): Promise<TestModel>;
  getAll(): Promise<TestModel[]>;
}
