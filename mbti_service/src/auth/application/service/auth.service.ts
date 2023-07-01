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
    const { accessToken, refreshToken } = socialLoginCommand;
    const [accessTokenJwt, refreshTokenJwt] = await Promise.all([
      this.tokenService.createAccessToken(accessToken),
      this.tokenService.createRefreshToken(refreshToken),
    ]);

    return { accessToken: accessTokenJwt, refreshToken: refreshTokenJwt };
  }
}
