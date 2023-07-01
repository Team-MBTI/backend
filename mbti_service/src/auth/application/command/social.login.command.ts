export class SocialLoginCommand {
  accessToken: string;
  refreshToken: string;
  email: string;

  constructor(input: {
    accessToken: string;
    refreshToken: string;
    email: string;
  }) {
    this.accessToken = input.accessToken;
    this.refreshToken = input.refreshToken;
  }
}
