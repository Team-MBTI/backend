import { Request } from 'express';
import { SaveResultCommand } from '../application/command/save.result.command';

export class TestResultDtoMapper {
  static toSaveResult(
    req: Request & { user: { userId: string } },
    resultId: number,
  ) {
    return new SaveResultCommand(resultId, Number(req.user.userId));
  }
}
