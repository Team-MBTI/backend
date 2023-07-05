import { ApiProperty } from '@nestjs/swagger';
import { SubmitTestInfo } from '../../application/info/submit.test.info';

export class SubmitTestResponse {
  @ApiProperty({
    description: '결과에 해당하는 id',
    example: 3,
  })
  resultId: number;

  @ApiProperty({
    description: '결과에 나올 여행지의 이름',
    example: '속초',
  })
  destinationName: string;

  @ApiProperty({
    description: '결과에 나올 여행지의 이미지',
    example: 'http://sample/img',
  })
  destinationImgUrl: string;

  @ApiProperty({
    description: '결과에 나올 여행지의 세부내용',
    example: '속초 내용',
  })
  destinationContent: string;

  @ApiProperty({
    description: '결과에 나올 여행지의 세부내용의 image',
    example: 'http://sample/img',
  })
  destinationContentImgUrl: string;

  @ApiProperty({
    description: '결과후 나온 mbti',
    example: 'INTP',
  })
  mbti: string;

  constructor(info: SubmitTestInfo) {
    this.resultId = info.resultId;
    this.destinationName = info.destinationName;
    this.destinationImgUrl = info.destinationImgUrl;
    this.destinationContent = info.destinationContent;
    this.destinationContentImgUrl = info.destinationContentImgUrl;
    this.mbti = info.mbti;
  }
}
