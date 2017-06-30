import {EventEmitter, Injectable} from '@angular/core';
import { Contact } from "./contact.model";
import { MOCKCONTACTS } from "./MOCKCONTACTS"

@Injectable()
export class ContactService {

  contacts: Contact[] = [];

  currentContact: Contact = null;
  contactSelectedEvent = new EventEmitter<Contact>();
  contactsChangeEvent  = new EventEmitter<Contact[]>();

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.contacts = this.contacts.sort(this.compareNames);
    this.currentContact = this.getContact("7"); // hardcoded value for now
  }


  getContacts(): Contact[] {
    return this.contacts.slice();
  }


  compareNames(contactA: Contact, contactB: Contact) {
    if (contactA.name < contactB.name)
      return -1;
    if (contactA.name > contactB.name)
      return 1;
    return 0;

  }

  getContact(id: string): Contact {
    for (let contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  addContact(contact: Contact) {
    if (contact === null)
      return;
    this.contacts.push(contact);
    this.contactsChangeEvent.emit(this.contacts.slice());
  }


  deleteContact(contact: Contact) {
    if (contact === null) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos,1);
    this.contacts = [...this.contacts];
    this.contactsChangeEvent.emit(this.contacts.slice());
  }


  updateContact(contact: Contact) {
    if (contact === null)
      return;

    const pos = this.contacts.indexOf(contact);
    if (pos < 0)
      return;

    this.contacts = [...this.contacts];
    this.contactsChangeEvent.emit(this.contacts.slice());
  }
}
