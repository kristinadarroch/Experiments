import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Message} from "../message.model";
import {MessageService} from "../message.service";
import {ContactService} from "../../contacts/contact.service";

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {

  @ViewChild('subject') subjectElement: ElementRef;
  @ViewChild('msgText') msgTextElement: ElementRef;

  constructor(private messageService: MessageService, private contactService: ContactService) { }

  ngOnInit() {
  }

  onSendMessage() {
    const subject = this.subjectElement.nativeElement.value;
    const msgText = this.msgTextElement.nativeElement.value;
    const sender: string = this.contactService.currentContact.id;
    let message: Message = new Message("", subject, msgText, sender);
    this.messageService.addMessage(message);
    this.onClear();
  }

  onClear() {
    this.subjectElement.nativeElement.value = " ";
    this.msgTextElement.nativeElement.value = " ";
    this.subjectElement.nativeElement.focus();
  }

}
