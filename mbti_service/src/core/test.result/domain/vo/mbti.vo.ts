import { Enumify } from 'enumify-ts';

export class MBTI extends Enumify<MBTI>() {
  static ISTJ = new MBTI();
  static ISFJ = new MBTI();
  static INFJ = new MBTI();
  static INTJ = new MBTI();
  static ISTP = new MBTI();
  static ISFP = new MBTI();
  static INFP = new MBTI();
  static INTP = new MBTI();
  static ESTP = new MBTI();
  static ESFP = new MBTI();
  static ENFP = new MBTI();
  static ENTP = new MBTI();
  static ESTJ = new MBTI();
  static ESFJ = new MBTI();
  static ENFJ = new MBTI();
  static ENTJ = new MBTI();
  private static _ = this._closeEnum();

  public static decideMBTI(
    IEscore: number,
    NSscore: number,
    FTscore: number,
    PJscore: number,
  ): MBTI {
    const mbtiArray = [
      IEscore > 0 ? 1 : 0,
      NSscore > 0 ? 1 : 0,
      FTscore > 0 ? 1 : 0,
      PJscore > 0 ? 1 : 0,
    ].join('');

    let mbti = null;
    switch (mbtiArray) {
      case '1111':
        mbti = MBTI.ESTJ;
        break;
      case '1110':
        mbti = MBTI.ESTP;
        break;
      case '1101':
        mbti = MBTI.ESFJ;
        break;
      case '1100':
        mbti = MBTI.ESFP;
        break;
      case '1011':
        mbti = MBTI.ENTJ;
        break;
      case '1010':
        mbti = MBTI.ENTP;
        break;
      case '1001':
        mbti = MBTI.ENFJ;
        break;
      case '1000':
        mbti = MBTI.ENFP;
        break;
      case '0111':
        mbti = MBTI.ISTJ;
        break;
      case '0110':
        mbti = MBTI.ISTP;
        break;
      case '0101':
        mbti = MBTI.ISFJ;
        break;
      case '0100':
        mbti = MBTI.ISFP;
        break;
      case '0011':
        mbti = MBTI.INTJ;
        break;
      case '0010':
        mbti = MBTI.INTP;
        break;
      case '0001':
        mbti = MBTI.INFJ;
        break;
      case '0000':
        mbti = MBTI.INFP;
        break;
    }
    return mbti;
  }
}
