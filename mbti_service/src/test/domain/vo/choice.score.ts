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

  getProperties() {
    return {
      questionId: this.questionId,
      choiceOneScore: this.choiceoneScore,
      choiceTwoScore: this.choiceTwoScore,
      type: this.type,
    };
  }

  getScoreByChoice(choiceNumber: number) {
    if (choiceNumber == 1) {
      return this.choiceoneScore;
    } else {
      return this.choiceTwoScore;
    }
  }
}
