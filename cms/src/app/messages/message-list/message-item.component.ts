import { Component, OnInit, Input } from '@angular/core';
import {Message} from "../message";

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {

  @Input() messageIdx: number;
  @Input() message: Message;

  constructor() { }

  ngOnInit() {
  }

}
