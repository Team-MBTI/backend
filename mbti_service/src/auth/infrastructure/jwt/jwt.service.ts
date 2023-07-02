import { Inject, Injectable } from '@nestjs/common';
import { TokenService } from '../../application/outport/token.service';
import commonLoginConfig from '../../../config/common.login.config';
import { ConfigType } from '@nestjs/config';
import * as jwService from 'jsonwebtoken';

@Injectable()
export class JwtTokenService implements TokenService {
  constructor(
    @Inject(commonLoginConfig.KEY)
    private readonly config: ConfigType<typeof commonLoginConfig>,
  ) {}

  async createAccessToken(value: any) {
    console.log(this.config.accessExpiresIn);
    const jwt = await jwService.sign({ ...value }, this.config.jwtSecret, {
      expiresIn: this.config.accessExpiresIn,
    });
    return jwt;
  }

  async createRefreshToken(value: any) {
    console.log(this.config.refreshExpiresIn);
    const jwt = await jwService.sign({ ...value }, this.config.jwtSecret, {
      expiresIn: this.config.refreshExpiresIn,
    });
    return jwt;
  }
}
