export class TftsDetail {

  constructor(public puuid?: string,
              public nom?: string,
              public placement?: number,
              public kill?: number,
              public trait?: any[],
              public units?: any[],
              public tempEliminer?: string,
              public round?: string,
              public gold?: number,
              public companionId?: number,
              public lienImageCompanion?: string
  ) {  }
}
