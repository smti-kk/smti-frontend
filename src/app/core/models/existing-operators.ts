import { autoserializeAs } from 'cerialize';
import { Operator } from '@core/models/operator';

export class ExistingOperators {
  @autoserializeAs(Operator, 'cellurar')
  private readonly _cellular: Operator[];

  @autoserializeAs(Operator, 'radio')
  private readonly _radio: Operator[];

  @autoserializeAs(Operator, 'internet')
  private readonly _internet: Operator[];

  @autoserializeAs(Operator, 'ats')
  private readonly _ats: Operator[];

  @autoserializeAs(Operator, 'post')
  private readonly _post: Operator[];

  @autoserializeAs(Operator, 'television')
  private readonly _television: Operator[];


  constructor(cellular: Operator[], radio: Operator[], internet: Operator[], ats: Operator[], post: Operator[], television: Operator[]) {
    this._cellular = cellular;
    this._radio = radio;
    this._internet = internet;
    this._ats = ats;
    this._post = post;
    this._television = television;
  }


  get cellular(): Operator[] {
    return this._cellular;
  }

  get radio(): Operator[] {
    return this._radio;
  }

  get internet(): Operator[] {
    return this._internet;
  }

  get ats(): Operator[] {
    return this._ats;
  }

  get post(): Operator[] {
    return this._post;
  }

  get television(): Operator[] {
    return this._television;
  }
}
