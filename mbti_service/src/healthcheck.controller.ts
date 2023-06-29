import { Controller, Get } from '@nestjs/common';

@Controller()
export class healthCheckController {
  @Get('/')
  healthChecker() {
    return 'ok';
  }
}
