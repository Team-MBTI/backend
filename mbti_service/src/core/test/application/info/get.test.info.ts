import { TestModel } from '../../domain/test.model';

export type QuestionInfoType = {
  questionNumber: number;
  content: string;
  choiceOneContent: string;
  choiceOneScore: number;
  choiceTwoContent: string;
  choiceTwoScore: number;
};

export class GetTestInfo {
  readonly id: number;
  readonly name: string;
  readonly imgUrl: string;
  readonly questions: QuestionInfoType[];

  constructor(test: TestModel) {
    const properties = test.getProperties();
    this.id = properties.id;
    this.name = properties.name;
    this.imgUrl = properties.imgUrl;
    this.questions = properties.questions.map((question) =>
      question.getProperties(),
    );
  }
}
