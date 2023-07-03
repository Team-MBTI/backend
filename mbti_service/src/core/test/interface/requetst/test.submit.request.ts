import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AnswerRequst {
  @ApiProperty({ description: '문제의 순번', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  questionNumber: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: '선택한번호', example: 1 })
  choiceNumber: number;
}

export class SubmitTestRequest {
  @IsNotEmpty()
  @ApiProperty({
    type: [AnswerRequst],
  })
  answer: AnswerRequst[];
}
