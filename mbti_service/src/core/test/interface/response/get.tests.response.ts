import { GetTestsInfo } from '../../application/info/get.tests.info';

export class GetTestsResponse {
  id: number;
  name: string;
  imgUrl: string;

  constructor(info: GetTestsInfo) {
    this.id = info.id;
    this.name = info.name;
    this.imgUrl = info.imgUrl;
  }
}
