import { TestResultModel } from '../../../test.result/domain/test.result.model';

export class SubmitTestInfo {
  readonly resultId: number;
  readonly destinationName: string;
  readonly destinationImgUrl: string;
  readonly destinationContent: string;
  readonly destinationContentImgUrl: string;
  readonly mbti: string;

  constructor(testResult: TestResultModel) {
    const properties = testResult.getProperteis();
    const destination = properties.destination;
    this.resultId = properties.id;
    this.destinationName = destination.name;
    this.destinationImgUrl = destination.imgUrl;
    this.destinationContent = destination.content;
    this.destinationContentImgUrl = destination.contentImgUrl;
    this.mbti = destination.mbti.key;
  }
}
