export interface TokenService {
  createAccessToken(value: string): Promise<string>;
  createRefreshToken(value: string): Promise<string>;
}
