import { ApiProperty } from '@nestjs/swagger';
import { GetUserTestResultInfo } from '../../application/info/user.get.test.result.info';

export class DestinationResponse {
  @ApiProperty({
    description: '결과에 나온 destination 이름',
    example: '강원도',
  })
  name: string;

  @ApiProperty({
    description: 'destination 이미지 url',
    example: 'http://sample.img',
  })
  imgUrl: string;

  @ApiProperty({
    description: 'destination 설명',
    example: '강원도에 대한 설명',
  })
  content: string;

  @ApiProperty({
    description: '컨텐츠에 대한 이미지 url',
    example: 'http://sample.img',
  })
  contentImgUrl: string;

  @ApiProperty({
    description: 'mbti 값',
    example: 'INFP',
  })
  mbti: string;
}

export class GetUserTestResultResponse {
  @ApiProperty({
    description: 'test Id',
    example: 3,
  })
  id: number;

  @ApiProperty({
    description: 'test 이름',
    example: 'mbti 를 통한 여행지 선출',
  })
  name: string;

  @ApiProperty({
    description: 'test 설명',
    example: 'mbti 를 통한 여행지 선출 설명',
  })
  content: string;

  @ApiProperty({
    description: 'test 결과 날짜',
    example: '2023-07-03T13:34:26.827Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: '결과에 의해 도출된 여행지 정보',
    type: DestinationResponse,
  })
  destination: DestinationResponse;

  constructor(info: GetUserTestResultInfo) {
    this.id = info.id;
    this.name = info.name;
    this.content = info.content;
    this.destination = info.destination;
    this.createdAt = info.createdAt;
  }
}
