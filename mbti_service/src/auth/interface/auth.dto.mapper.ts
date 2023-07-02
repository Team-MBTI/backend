import { Request } from 'express';
import { SocialLoginCommand } from '../application/command/social.login.command';
import { kakaoUserTypeResponse } from './auth.controller';
import { RestoreAccessTokenComamnd } from '../application/command/restore.access.token.command';

export class AuthDtoMapper {
  public static toSocialLoginCommand(request: Request & kakaoUserTypeResponse) {
    return new SocialLoginCommand({
      ...request.user,
    });
  }

  public static toLogoutCommand(
    request: Request & { user: { email: string } },
  ) {
    return request.user.email;
  }

  public static toAccessTokenRestoreCommand(
    request: Request & { user: { email: string; nickname: string } },
  ) {
    const { email, nickname } = request.user;
    return new RestoreAccessTokenComamnd(email, nickname);
  }
}
