import { MBTIPartial } from './vo/mbti.partial.vo';
import { Question } from './vo/question.vo';

export class TestModel {
  private readonly id: number;
  private name: string;
  private imgUrl: string;
  private questions: Question[];

  constructor(inputData: TestConstructorInput) {
    this.id = inputData.id;
    this.name = inputData.name;
    this.imgUrl = inputData.imgUrl;
    this.questions = inputData.questions?.map(
      (questionSet) => new Question({ ...questionSet }),
    );
  }

  public static createTest(createData: CreateTestProperty) {
    return new TestModel({ id: null, ...createData });
  }

  public getProperties() {
    return {
      id: this.id,
      name: this.name,
      imgUrl: this.imgUrl,
      questions: this.questions,
    };
  }
}

export type TestConstructorInput = {
  id: number;
  name: string;
  imgUrl: string;
  questions: QuestionCreateSet[];
};

export type QuestionCreateSet = {
  content: string;
  questionNumber: number;
  type: MBTIPartial;
  choiceOneContent: string;
  choiceOneScore: number;
  choiceTwoContent: string;
  choiceTwoScore: number;
};

export type CreateTestProperty = Omit<TestConstructorInput, 'id'>;

export type UpdateTestProperty = Partial<CreateTestProperty>;
