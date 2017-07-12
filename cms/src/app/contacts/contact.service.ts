import {EventEmitter, Injectable} from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS'
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ContactService {

  contacts: Contact[] = [];
  currentContact: Contact = null;
  maxId: number = 0;
  contactsChangeEvent  = new Subject<Contact[]>();

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxId = this.getMaxId();
    this.contacts = this.contacts.sort(this.compareNames);
    this.currentContact = this.getContact('7'); // hardcoded value for now
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  compareNames(contactA: Contact, contactB: Contact) {
    if (contactA.name < contactB.name) {
      return -1;
    }
    if (contactA.name > contactB.name) {
      return 1;
    }
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
    if (!contact) {
      return;
    }
    this.maxId++;
    contact.id = String(this.maxId);
    this.contacts.push(contact);
    this.contacts = this.contacts.sort(this.compareNames);
    this.contactsChangeEvent.next(this.contacts.slice());
  }


  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) { // contact does not exist
      return;
    }

    this.contacts.splice(pos,1);
    this.contacts = [...this.contacts];
    this.contacts = this.contacts.sort(this.compareNames);
    this.contactsChangeEvent.next(this.contacts.slice());
  }


  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact) {
      return;
    }

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) { // contact not found
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.contacts = this.contacts.sort(this.compareNames);
    this.contactsChangeEvent.next(this.contacts.slice());
  }

  getMaxId(): number {
    let maxId = 0;
    for (let contact of this.contacts) {
      const id: number = parseInt(contact.id, 0);
      if (id > maxId) {
        maxId = id;
      }
    }
    return maxId;
  }



}
