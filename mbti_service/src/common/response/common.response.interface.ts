export interface CommonResponse {
  statusCode: number;
  message: string;
  data?: unknown[] | object;
}
