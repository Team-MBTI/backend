import { Injectable } from '@nestjs/common';
import { MBTI } from '../../test.result/domain/vo/mbti.vo';
import { answerType } from '../application/command/test.submit.command';
import { TestModel } from './test.model';
import { MBTIPartial } from './vo/mbti.partial.vo';
import { Destination } from '../../test.result/domain/vo/destination.vo';
import { TestResultModel } from '../../test.result/domain/test.result.model';

type QuestionProperyType = {
  questionNumber: number;
  content: string;
  type: MBTIPartial;
  choiceOneContent: string;
  choiceOneScore: number;
  choiceTwoContent: string;
  choiceTwoScore: number;
};

type ScoreType = {
  EIResult: number;
  NSResult: number;
  FTResult: number;
  JPResult: number;
};

@Injectable()
export class TestDomainService {
  calculateResult(answers: answerType[], test: TestModel) {
    const questionsSet = test
      .getProperties()
      .questions.map((question) => question.getProperties());
    let IEscore = 0;
    let NSscore = 0;
    let FTscore = 0;
    let JPscore = 0;

    const testMap = new Map<number, QuestionProperyType>();
    questionsSet.forEach((questionSet) => {
      testMap.set(questionSet.questionNumber, questionSet);
    });
    answers.forEach((answer) => {
      const selectedQuestion = testMap.get(answer.questionNumber);
      const type = selectedQuestion.type;
      const pick = answer.choiceNumber;
      switch (type.key) {
        case MBTIPartial.IE.key:
          if (pick == 1) IEscore += selectedQuestion.choiceOneScore;
          else IEscore += selectedQuestion.choiceTwoScore;
          break;
        case MBTIPartial.NS.key:
          if (pick == 1) NSscore += selectedQuestion.choiceOneScore;
          else NSscore += selectedQuestion.choiceTwoScore;
          break;
        case MBTIPartial.FT.key:
          if (pick == 1) FTscore += selectedQuestion.choiceOneScore;
          else FTscore += selectedQuestion.choiceTwoScore;
          break;
        case MBTIPartial.PJ.key:
          if (pick == 1) JPscore += selectedQuestion.choiceOneScore;
          else JPscore += selectedQuestion.choiceTwoScore;
          break;
      }
    });
    const mbti = this.decideMBTI(IEscore, NSscore, FTscore, JPscore);
    return {
      mbti,
      EIResult: IEscore,
      NSResult: NSscore,
      FTResult: FTscore,
      JPResult: JPscore,
    };
  }

  public createResult(
    score: ScoreType,
    testId: number,
    destination: Destination,
  ) {
    return TestResultModel.createTestResult({ ...score, testId, destination });
  }

  private decideMBTI(
    IEscore: number,
    NSscore: number,
    FTscore: number,
    JPscore: number,
  ): MBTI {
    return MBTI.decideMBTI(IEscore, NSscore, FTscore, JPscore);
  }
}
