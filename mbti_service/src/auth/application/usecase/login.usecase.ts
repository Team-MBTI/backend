import { SocialLoginCommand } from '../command/social.login.command';

export interface loginUseCase {
  socialLogin(
    socialLoginCommand: SocialLoginCommand,
  ): Promise<{ accessToken: string; refreshToken: string }>;
}
