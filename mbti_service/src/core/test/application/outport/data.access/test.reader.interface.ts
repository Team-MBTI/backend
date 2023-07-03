import { TestModel } from '../../../domain/test.model';

export interface ITestReader {
  get(testId: string): Promise<TestModel>;
  getAll(): Promise<TestModel[]>;
}
