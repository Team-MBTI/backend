export class RestoreAccessTokenComamnd {
  email: string;
  nickname: string;

  constructor(email: string, nickname: string) {
    this.email = email;
    this.nickname = nickname;
  }
}
