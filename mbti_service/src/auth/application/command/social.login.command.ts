export class SocialLoginCommand {
  accessToken: string;
  refreshToken: string;

  constructor(input: { accessToken: string; refreshToken: string }) {
    this.accessToken = input.accessToken;
    this.refreshToken = input.refreshToken;
  }
}
