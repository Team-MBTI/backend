import { GetTestInfo } from '../../application/info/get.test.info';

export class GetTestQuestionResponse {
  questionNumber: number;
  content: string;
  choiceOneContent: string;
  choiceOneScore: number;
  choiceTwoContent: string;
  choiceTwoScore: number;
}

export class GetTestResponse {
  id: number;
  name: string;
  imgUrl: string;
  questions: GetTestQuestionResponse[];

  constructor(info: GetTestInfo) {
    this.id = info.id;
    this.name = info.name;
    this.imgUrl = info.imgUrl;
    this.questions = info.questions;
  }
}
