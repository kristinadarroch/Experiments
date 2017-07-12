import { Component, OnInit, OnDestroy } from '@angular/core';
import {Contact} from "../contact";
import {ContactsService} from "../contacts.service";
import {Router} from "@angular/router";
import {ContactsFilterPipe} from "../contacts-filter.pipe";
import {Subscription} from "rxjs";

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {

  contacts: Contact[] = [];
  contact: Contact = null;
  contactIdx: number;
  term: string = "";
  filterFunction: any = null;
  subscription: Subscription;

  constructor(private router: Router, private contactsService: ContactsService) {
  }

  ngOnInit() {
    this.contacts = this.contactsService.getContacts();
    this.subscription = this.contactsService.getContactsEmitter.subscribe(
      ( contacts: Contact[]) => this.contacts = contacts
    );
  }

  onKeyPress(value: string) {
    this.term = value;
    }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
