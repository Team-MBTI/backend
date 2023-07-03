export class CommonSuccessResponse<T> {
  status: string;
  data: T;

  constructor(data: T, status) {
    this.status = status;
    this.data = data;
  }
}
