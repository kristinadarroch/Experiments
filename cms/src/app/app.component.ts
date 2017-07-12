import { Component } from '@angular/core';
import {ContactsService} from "./contacts/contacts.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WeLearn CMS!';

  constructor(private contactsService: ContactsService) {}

}
