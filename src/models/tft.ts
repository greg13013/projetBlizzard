import {TftsDetail} from './tftDetail';
import {Match} from './match';

export class Tfts {

  constructor(public puuid?: string,
              public date?: Date,
              public match?: Match [],
              public participant?: TftsDetail []
              ) {  }
}
