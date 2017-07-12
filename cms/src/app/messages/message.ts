import {Injectable} from '@angular/core';

@Injectable()
export class Message {
  id: string;
  subject: string;
  text: string;
  sender: string;

  constructor(id: string, subject: string, text: string, sender: string) {
    this.id = id;
    this.subject = subject;
    this.text = text;
    this.sender = sender;
  }


}

