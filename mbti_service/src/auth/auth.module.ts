import { Module } from '@nestjs/common';
import { AuthController } from './interface/auth.controller';
import { KakaoStrategy } from './infrastructure/strategies/kakao.strategy';
import { LoginService } from './application/service/auth.service';

@Module({
  controllers: [AuthController],
  providers: [
    KakaoStrategy,
    {
      provide: 'loginUseCase',
      useClass: LoginService,
    },
  ],
  exports: [KakaoStrategy],
})
export class AuthModule {}
