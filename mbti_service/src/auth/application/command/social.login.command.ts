export class SocialLoginCommand {
  nickName: string;
  email: string;

  constructor(input: { nickName: string; email: string }) {
    this.nickName = input.nickName;
    this.email = input.email;
  }
}
