export type answerType = {
  questionNumber: number;
  choiceNumber: number;
};

export class TestSubmitCommand {
  testId: number;
  answers: answerType[];

  constructor(testId: number, answer: answerType[]) {
    this.testId = testId;
    this.answers = [...answer];
  }
}
