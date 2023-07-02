export class GetQuestionDto {
  private questionNumber: number;
  private content: string;
  private choiceOneContent: string;
  private choiceTwoContent: string;

  constructor(questionInput: GetQuestionDto) {
    this.questionNumber = questionInput.questionNumber;
    this.content = questionInput.content;
    this.choiceOneContent = questionInput.choiceOneContent;
    this.choiceTwoContent = questionInput.choiceTwoContent;
  }
}

export type QuestionDtoConstructorInput = {
  questionNumber: number;
  content: string;
  choiceOneContent: string;
  choiceTwoContent: string;
};
