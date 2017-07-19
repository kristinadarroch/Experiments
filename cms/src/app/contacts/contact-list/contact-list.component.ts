import {Component, OnInit, OnDestroy} from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit, OnDestroy {

  contact: Contact = null;
  contacts: Contact[] = [];
  term: string = "";
  private contactsChangeEvent: Subscription;


  constructor(private contactService: ContactService) {
    this.contacts = this.contactService.getContacts();
  }

  ngOnInit() {
    this.contactsChangeEvent = this.contactService.contactsChangeEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }
    );
  }

  onKeyPress(value: string) {
    this.term = value;
  }

  ngOnDestroy() {
    this.contactsChangeEvent.unsubscribe();
  }



}




