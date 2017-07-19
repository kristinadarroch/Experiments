

import {EventEmitter, Injectable} from '@angular/core';
import {Message} from './message.model';
import {MOCKMESSAGES} from './MOCKMESSAGES';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class MessageService {
  currentMessage: Message;
  currentMessageId: string;

  private messages: Message[];
  messageChangeEvent = new Subject<Message[]>();

  constructor() {
    this.messages = MOCKMESSAGES;
    this.currentMessageId = '1';
  }

  getMessage(id: string): boolean {
    for (let i = 0; i < this.messages.length; i++) {
      if (this.messages[i].id === id) {
        this.currentMessage = this.messages[i];
        return true;
      }
    }
    return false;
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }


  addMessage(message: Message) {
    if (message === null) {
      return;
    }
    this.messages.push(message);
    this.messageChangeEvent.next(this.messages.slice()  );
  }


  deleteMessage(message: Message) {
    if (message === null) {
      return;
    }

    const pos = this.messages.indexOf(message);
    if (pos < 0) {
      return;
    }

    this.messages.splice(pos, 1);
    this.messages = [...this.messages];
    this.messageChangeEvent.next(this.messages.slice());
  }


  updateMessage(message: Message) {
    if (message === null) {
      return;
    }
    const pos = this.messages.indexOf(message);
    if (pos < 0) {
      return;
    }

    this.messages = [...this.messages];
    this.messageChangeEvent.next(this.messages.slice());
  }



}
