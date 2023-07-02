import { Inject, Injectable } from '@nestjs/common';
import { SocialLoginCommand } from '../command/social.login.command';
import { loginUseCase } from '../usecase/login.usecase';
import { TokenService } from '../outport/token.service';

@Injectable()
export class LoginService implements loginUseCase {
  constructor(
    @Inject('TokenService')
    private readonly tokenService: TokenService,
  ) {}

  async socialLogin(socialLoginCommand: SocialLoginCommand) {
    const { nickName, email } = socialLoginCommand;
    const payload = { nickName, email };
    const [accessTokenJwt, refreshTokenJwt] = await Promise.all([
      this.tokenService.createAccessToken(payload),
      this.tokenService.createRefreshToken(payload),
    ]);
    return { accessToken: accessTokenJwt, refreshToken: refreshTokenJwt };
  }
}
