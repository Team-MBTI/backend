import { TestModel } from '../../domain/test.model';

export class GetTestsInfo {
  readonly id: number;
  readonly name: string;
  readonly imgUrl: string;

  constructor(test: TestModel) {
    const properteis = test.getProperties();
    this.id = properteis.id;
    this.name = properteis.name;
    this.imgUrl = properteis.imgUrl;
  }
}
