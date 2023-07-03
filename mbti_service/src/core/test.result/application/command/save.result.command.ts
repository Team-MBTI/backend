export class SaveResultCommand {
  resultId: number;
  userId: number;

  constructor(resultId: number, userId: number) {
    this.resultId = resultId;
    this.userId = userId;
  }
}
