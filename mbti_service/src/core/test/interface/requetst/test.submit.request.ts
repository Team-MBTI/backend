import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class AnswerRequst {
  @ApiProperty({ description: '문제의 순번', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  @Max(12)
  @Min(1)
  questionNumber: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: '선택한번호', example: 1 })
  @Max(2)
  @Min(1)
  choiceNumber: number;
}

export class SubmitTestRequest {
  @IsNotEmpty()
  @ApiProperty({
    type: [AnswerRequst],
  })
  answer: AnswerRequst[];
}
