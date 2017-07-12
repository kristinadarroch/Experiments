import {Injectable} from '@angular/core';

@Injectable()
export class Document {


  constructor(public id: string, public name: string, public description: string,  public url: string) {
    this.description = null;
  }
}
