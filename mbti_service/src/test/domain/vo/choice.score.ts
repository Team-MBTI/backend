export class ChoiceScore {
  questionId: number;
  choiceoneScore: number;
  choiceTwoScore: number;
  type: string;

  constructor(
    questionId: number,
    choiceOneScore: number,
    choiceTwoScore: number,
    type: string,
  ) {
    this.questionId = questionId;
    this.choiceoneScore = choiceOneScore;
    this.choiceTwoScore = choiceTwoScore;
    this.type = type;
  }
}
