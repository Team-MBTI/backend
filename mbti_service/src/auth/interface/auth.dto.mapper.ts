import { Request } from 'express';
import { SocialLoginCommand } from '../application/command/social.login.command';
import { kakaoUserTypeResponse } from './auth.controller';

export class AuthDtoMapper {
  public static toSocialLoginCommand(request: Request & kakaoUserTypeResponse) {
    return new SocialLoginCommand({
      ...request.user,
    });
  }
}
