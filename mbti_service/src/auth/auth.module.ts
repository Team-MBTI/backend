import { Module } from '@nestjs/common';
import { AuthController } from './interface/auth.controller';
import { KakaoStrategy } from './infrastructure/strategies/kakao.strategy';
import { LoginService } from './application/service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtTokenService } from './infrastructure/jwt/jwt.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    KakaoStrategy,
    {
      provide: 'LoginUseCase',
      useClass: LoginService,
    },
    {
      provide: 'TokenService',
      useClass: JwtTokenService,
    },
  ],
  exports: [KakaoStrategy],
})
export class AuthModule {}
