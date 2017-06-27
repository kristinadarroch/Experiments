import {Injectable} from '@angular/core';

@Injectable()
export class Document {
  id: string;
  name: string;
  description: string;
  url: string;
  children: Document[] = null;

  constructor(id: string, name: string, description: string, url: string, children: Document[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.url = url;
    this.children = children;
  }
}

