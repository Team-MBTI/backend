import { Inject, Injectable } from '@nestjs/common';
import { SocialLoginCommand } from './command/social.login.command';
import { SessionUseCase } from './usecase/login.usecase';
import { TokenService } from './outport/token.service';
import { ISessionStore } from './outport/data.access/session.store.interface';
import { RestoreAccessTokenComamnd } from './command/restore.access.token.command';

@Injectable()
export class LoginService implements SessionUseCase {
  constructor(
    @Inject('TokenService')
    private readonly tokenService: TokenService,

    @Inject('ISessionStore')
    private readonly sessionStore: ISessionStore,
  ) {}

  async socialLogin(command: SocialLoginCommand) {
    const { nickname, email, userId } = command;
    const payload = { nickname, email, userId };
    const [accessTokenJwt, refreshTokenJwt] = await Promise.all([
      this.tokenService.createAccessToken(payload),
      this.tokenService.createRefreshToken(payload),
    ]);
    await this.sessionStore.create(refreshTokenJwt, email);
    return { accessToken: accessTokenJwt, refreshToken: refreshTokenJwt };
  }

  async logout(email: string): Promise<void> {
    await this.sessionStore.deleteByEmail(email);
  }

  async restoreAccessToken(command: RestoreAccessTokenComamnd) {
    const { nickname, email } = command;
    const payload = { nickname, email };
    const accessTokenJwt = await this.tokenService.createAccessToken(payload);
    return accessTokenJwt;
  }
}
