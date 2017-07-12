import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit, OnDestroy {

  messages: Message[] = [];
  private messageChangeEvent: Subscription;

  constructor(private messageService: MessageService) {
    this.messages = this.messageService.getMessages();
  }

  ngOnInit() {
    this.messageChangeEvent = this.messageService.messageChangeEvent
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
        }
      );
  }

  ngOnDestroy() {
    this.messageChangeEvent.unsubscribe();
  }


}
