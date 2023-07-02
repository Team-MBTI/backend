import { ChoiceScore } from './choice.score';
import { TestChoice } from './test.choice';

export class ScoreBoard {
  private scores: ChoiceScore[];
  private static negativeResult = ['I', 'S', 'T', 'P'];
  private static positiveResult = ['E', 'N', 'F', 'J'];
  private mbtiScore = [0, 0, 0, 0];
  private mbtiResult = '';

  constructor(input: ChoiceScore[]) {
    this.scores = input.map((choice) => {
      return new ChoiceScore(
        choice.questionId,
        choice.choiceoneScore,
        choice.choiceTwoScore,
        choice.type,
      );
    });
  }

  getTestResult(userChoice: TestChoice[]): string {
    // 모두 questionId를 기준으로 오름차순 정렬하여 순서 맞춤
    const sortedScoreBoard = this.scores.sort(
      (a, b) => a.questionId - b.questionId,
    );
    const sortedUserChoice = userChoice.sort(
      (a, b) => a.questionId - b.questionId,
    );

    // 반복문 돌며 score 계산
    sortedUserChoice.forEach((uChoice, idx) => {
      const score = this.getScoreByChoice(uChoice.choice, idx);
      const scoreIdx = this.getScoreIndex(idx);
      this.mbtiScore[scoreIdx] += score;
    });

    this.mbtiScore.forEach((score, idx) => {
      let res = '';
      if (score > 0) {
        res = ScoreBoard.positiveResult[idx];
      } else {
        res = ScoreBoard.negativeResult[idx];
      }
      this.mbtiResult += res;
    });
    return this.mbtiResult;
  }

  getScoreByChoice(choiceNumber: number, index: number) {
    if (choiceNumber == 1) {
      return this.scores[index].choiceoneScore;
    } else {
      return this.scores[index].choiceTwoScore;
    }
  }

  getScoreIndex(index: number) {
    const type = this.scores[index].type;
    if (type == 'EI') {
      return 0;
    } else if (type == 'NS') {
      return 1;
    } else if (type == 'FT') {
      return 2;
    } else {
      return 3;
    }
  }
}
