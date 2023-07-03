import { TestModel } from '../../domain/test.model';

export class GetTestsInfo {
  id: number;
  name: string;
  imgUrl: string;

  constructor(test: TestModel) {
    const properteis = test.getProperties();
    this.id = properteis.id;
    this.name = properteis.name;
    this.imgUrl = properteis.imgUrl;
  }
}
