import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Message} from "../message.model";

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subjectElement: ElementRef;
  @ViewChild('msgText') msgTextElement: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  constructor() {

  }

  ngOnInit() {
  }
  onSendMessage() {
    const subject = this.subjectElement.nativeElement.value;
    const msgText = this.msgTextElement.nativeElement.value;
    const sender: string = "Kristina Darroch";
    let message: Message = new Message("", subject, msgText, sender);
    this.addMessageEvent.emit(message);
    this.onClear();
  }

  onClear() {
    this.subjectElement.nativeElement.value = " ";
    this.msgTextElement.nativeElement.value = " ";
    this.subjectElement.nativeElement.focus();
  }
}
