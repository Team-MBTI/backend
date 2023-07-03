import { ApiProperty } from '@nestjs/swagger';
import { GetTestInfo } from '../../application/info/get.test.info';

export class GetTestQuestionResponse {
  @ApiProperty({
    description: 'question  의 순번',
    example: 1,
  })
  questionNumber: number;

  @ApiProperty({
    description: 'question 지문',
    example: 'sample content 내용',
  })
  content: string;

  @ApiProperty({
    description: '1번의 지문',
    example: '1번 지문 내용',
  })
  choiceOneContent: string;

  @ApiProperty({
    description: '1번의 점수 (음수) 혹은 (양수)',
    example: 1,
  })
  choiceOneScore: number;

  @ApiProperty({
    description: '2번의 지문',
    example: '2번 지문 내용',
  })
  choiceTwoContent: string;

  @ApiProperty({
    description: '2번의 점수 (음수) 혹은 (양수)',
    example: -1,
  })
  choiceTwoScore: number;
}

export class GetTestResponse {
  @ApiProperty({
    description: 'test id',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'test 의 이름',
    example: 'mbti 여행지 추천',
  })
  name: string;

  @ApiProperty({
    description: 'test 화면에 필요한 imgUrl',
    example: 'https://sample.image.task.img',
  })
  imgUrl: string;

  @ApiProperty({
    description: 'test 세트의 질문들',
    type: [GetTestQuestionResponse],
  })
  questions: GetTestQuestionResponse[];

  constructor(info: GetTestInfo) {
    this.id = info.id;
    this.name = info.name;
    this.imgUrl = info.imgUrl;
    this.questions = info.questions;
  }
}
