export class AnswerRequst {
  questionNumber: number;
  choiceNumber: number;
}

export class SubmitTestRequest {
  answer: AnswerRequst[];
}
