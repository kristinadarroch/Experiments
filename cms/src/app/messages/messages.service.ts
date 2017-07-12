

import {Injectable, EventEmitter} from '@angular/core';
import {Message} from './message';
import {Headers, Http, Response} from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class MessagesService {
  currentMessage: Message;
  currentMessageId: string;
  private messages: Message[];
  getMessagesEmitter = new EventEmitter<Message[]>();

  constructor(private http: Http) {
    this.initMessages();
    this.currentMessageId = '1';
  }


  initMessages() {
    return this.http.get('https://kristinadarrochcms.firebaseio.com/messages.json')
      .map((response: Response) => response.json())
      .subscribe(
        (data: Message[]) => {
          this.messages = data;
          this.getMessagesEmitter.emit(this.messages);
        }
      );
  }

  storeMessages() {
    const body = JSON.stringify(this.messages);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.put('https://kristinadarrochcms.firebaseio.com/messages.json'
      , body, {headers: headers}).subscribe();
  }


  getMessage(id: string): boolean {
    for (var i = 0; i < this.messages.length; i++) {
      if (this.messages[i].id === id) {
        this.currentMessage = this.messages[i]
        return true;
      }
    }
    return false;
  }

  getMessages() {
    return this.messages;
  }

  addMessage(message: Message) {
    if (!message)
      return;
    this.messages.push(message);
    this.storeMessages();
  }


  deleteMessage(message: Message) {
    if (!message === null) {
      return;
    }

    const pos = this.messages.indexOf(message);
    if (pos < 0) {
      return;
    }

    this.messages.splice(pos,1);
    this.storeMessages();
  }



}
