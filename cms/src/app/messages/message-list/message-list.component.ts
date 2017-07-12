import {Component, OnInit, OnDestroy} from '@angular/core';
import {Message} from "../message";
import {MessagesService} from "../messages.service";
import {Subscription} from "rxjs";



@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit, OnDestroy {

  messages: Message[] = [];
  subscription: Subscription;

  constructor(private messagesService: MessagesService) { }

  ngOnInit() {
    this.messages = this.messagesService.getMessages();
    this.subscription = this.messagesService.getMessagesEmitter.subscribe(
      ( messages: Message[]) => this.messages = messages
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
