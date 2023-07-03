export class CommonSuccessResponse<T> {
  status: 'ok';
  data: T;

  constructor(data: T) {
    this.data = data;
  }
}
