import { TestChoice } from '../../domain/vo/test.choice';

export class TestRequestDto {
   choices: TestChoice[];

  getChoices(): TestChoice[] {
    return this.choices;
  }
}
