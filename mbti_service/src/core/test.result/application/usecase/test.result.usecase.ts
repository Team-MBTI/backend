import { SaveResultCommand } from '../command/save.result.command';

export interface TestResultUseCase {
  saveResult(command: SaveResultCommand): Promise<void>;
}
