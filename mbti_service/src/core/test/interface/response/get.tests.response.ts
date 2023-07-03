import { ApiProperty } from '@nestjs/swagger';
import { GetTestsInfo } from '../../application/info/get.tests.info';

export class GetTestsResponse {
  @ApiProperty({
    description: 'test id',
    example: 3,
  })
  id: number;

  @ApiProperty({
    description: 'test 이름',
    example: 'test name',
  })
  name: string;

  @ApiProperty({
    description: 'test 에 필요한 이미지',
    example: 'http://sample.img',
  })
  imgUrl: string;

  constructor(info: GetTestsInfo) {
    this.id = info.id;
    this.name = info.name;
    this.imgUrl = info.imgUrl;
  }
}
