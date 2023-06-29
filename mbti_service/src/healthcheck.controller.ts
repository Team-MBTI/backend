import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class healthCheckController {
  constructor(
    private healthCheckService: HealthCheckService,
    private httpHealthIndicator: HttpHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  healthChecker() {
    return this.healthCheckService.check([
      () =>
        this.httpHealthIndicator.pingCheck(
          'nestjs-docs',
          'https://docs.nestjs.com',
        ),
    ]);
  }
}
