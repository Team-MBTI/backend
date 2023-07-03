import { Enumify } from 'enumify-ts';

export class MBTIPartial extends Enumify<MBTIPartial>() {
  static IE = new MBTIPartial();
  static NS = new MBTIPartial();
  static FT = new MBTIPartial();
  static PJ = new MBTIPartial();
  private static _ = this._closeEnum();

  constructor() {
    super();
  }
}
