import { MBTI } from './mbti.vo';

export class Destination {
  name: string;
  imgUrl: string;
  content: string;
  contentImgUrl: string;
  mbti: MBTI;

  constructor(input: DestinationConstructorInput) {
    this.name = input.name;
    this.imgUrl = input.imgUrl;
    this.content = input.content;
    this.contentImgUrl = input.contentImgUrl;
    this.mbti = input.mbti;
  }

  public getProperties() {
    return {
      name: this.name,
      imgUrl: this.imgUrl,
      content: this.content,
      contentImgUrl: this.contentImgUrl,
      mbti: this.mbti,
    };
  }
}

export type DestinationConstructorInput = {
  name: string;
  imgUrl: string;
  content: string;
  contentImgUrl: string;
  mbti: MBTI;
};
