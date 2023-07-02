export class SocialLoginCommand {
  nickname: string;
  email: string;

  constructor(input: { nickname: string; email: string }) {
    this.nickname = input.nickname;
    this.email = input.email;
  }
}
