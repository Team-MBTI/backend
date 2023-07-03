export class Question {
  private questionNumber: number;
  private content: string;
  private type: string;
  private choiceOneContent: string;
  private choiceOneScore: number;
  private choiceTwoContent: string;
  private choiceTwoScore: number;

  constructor(createData: QuestionCreateInput) {
    this.questionNumber = createData.questionNumber;
    this.content = createData.content;
    this.type = createData.type;
    this.choiceOneContent = createData.choiceOneContent;
    this.choiceOneScore = createData.choiceOneScore;
    this.choiceTwoContent = createData.choiceTwoContent;
    this.choiceTwoScore = createData.choiceTwoScore;
  }

  public getProperties() {
    return {
      questionNumber: this.questionNumber,
      content: this.content,
      type: this.type,
      choiceOneContent: this.choiceOneContent,
      choiceOneScore: this.choiceOneScore,
      choiceTwoContent: this.choiceTwoContent,
      choiceTwoScore: this.choiceTwoScore,
    };
  }
}

export type QuestionCreateInput = {
  questionNumber: number;
  content: string;
  type: string;
  choiceOneContent: string;
  choiceOneScore: number;
  choiceTwoContent: string;
  choiceTwoScore: number;
};
