import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import kakaoLoginConfig from '../../../config/kakao.login.config';
import { ConfigType } from '@nestjs/config';

export type kakaoUserType = {
  email: string;
  nickName: string;
  accessToken: string;
  refreshToken: string;
};

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    @Inject(kakaoLoginConfig.KEY)
    private readonly config: ConfigType<typeof kakaoLoginConfig>,
  ) {
    super({
      clientID: config.clientId,
      clientSecret: '',
      callbackURL: config.callbackUrl,
    });
  }

  async validate(accessToken, refreshToken, profile, done) {
    const profileJsonAccount = profile._json.kakao_account;
    const payload: kakaoUserType = {
      email: profileJsonAccount.email,
      nickName: profileJsonAccount.profile.nickname,
      accessToken,
      refreshToken,
    };
    try {
      done(null, payload);
    } catch (error) {
      done(error);
    }
  }
}
