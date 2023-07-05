import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

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
  @ValidateNested({ each: true })
  @Type(() => AnswerRequst)
  @ApiProperty({
    type: [AnswerRequst],
  })
  answer: AnswerRequst[];
}
