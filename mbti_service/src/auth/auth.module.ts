import { Module } from '@nestjs/common';
import { AuthController } from './interface/auth.controller';
import { KakaoStrategy } from './infrastructure/strategies/kakao.strategy';
import { LoginService } from './application/auth.service';
import { JwtTokenService } from './infrastructure/jwt/jwt.service';
import { UserModule } from '../user/user.module';
import { SessionRepository } from './infrastructure/data.access/session.repository';
import { SessionReader } from './infrastructure/data.access/sesssion.reader';
import { SessionStore } from './infrastructure/data.access/sesssion.store';
import { LocalAccessStrategy } from './infrastructure/strategies/local.access.strategy';
import { LocalRefreshStrategy } from './infrastructure/strategies/local.refresh.strategy';
import { MysqlModule } from '../provider/database.module';

@Module({
  imports: [UserModule, MysqlModule],
  controllers: [AuthController],
  providers: [
    KakaoStrategy,
    LocalAccessStrategy,
    LocalRefreshStrategy,
    {
      provide: 'SessionUseCase',
      useClass: LoginService,
    },
    {
      provide: 'TokenService',
      useClass: JwtTokenService,
    },
    {
      provide: 'ISessionRepository',
      useClass: SessionRepository,
    },
    {
      provide: 'ISessionReader',
      useClass: SessionReader,
    },
    {
      provide: 'ISessionStore',
      useClass: SessionStore,
    },
  ],
  exports: [LocalAccessStrategy, LocalRefreshStrategy],
})
export class AuthModule {}
