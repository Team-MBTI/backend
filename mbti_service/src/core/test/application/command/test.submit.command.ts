export type answerType = {
  questionNumber: number;
  choiceNumber: number;
};

export class TestSubmitCommand {
  readonly testId: number;
  readonly answers: answerType[];

  constructor(testId: number, answer: answerType[]) {
    this.testId = testId;
    this.answers = [...answer];
  }
}
