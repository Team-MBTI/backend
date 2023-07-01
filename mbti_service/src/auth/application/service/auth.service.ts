import { Injectable } from '@nestjs/common';
import { SocialLoginCommand } from '../command/social.login.command';
import { loginUseCase } from '../usecase/login.usecase';

@Injectable()
export class LoginService implements loginUseCase {
  constructor() {}

  async socialLogin(socialLoginCommand: SocialLoginCommand) {}
}
