import { TestResultModel } from '../../../test.result/domain/test.result.model';

export class GetUserTestResultInfo {
  readonly id: number;
  readonly name: string;
  readonly content: string;
  readonly createdAt: Date;
  readonly destination: {
    name: string;
    imgUrl: string;
    content: string;
    contentImgUrl: string;
    mbti: string;
  };

  constructor(result: TestResultModel) {
    const resultProperties = result.getProperteis();
    this.id = resultProperties.id;
    this.createdAt = resultProperties.createdAt;
    this.destination = {
      ...resultProperties.destination,
      mbti: resultProperties.destination.mbti.key,
    };
  }
}
