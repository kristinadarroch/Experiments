import {Injectable, EventEmitter} from '@angular/core';
import {Contact} from './contact'
import {Headers, Http, Response} from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class ContactsService {

  contacts: Contact[] = [];
  currentContact: Contact;
  getContactsEmitter = new EventEmitter<Contact[]>();

  constructor(private http: Http) {
    this.initContacts();
  }


  initContacts() {
    return this.http.get('https://kristinadarrochcms.firebaseio.com/contacts.json')
      .map((response: Response) => response.json())
      .subscribe(
        (data: Contact[]) => {
          this.contacts = data;
          this.currentContact = this.getContactById("7");
          this.contacts = this.contacts.sort(this.compareNames);
          this.getContactsEmitter.emit(this.contacts);
        }
      );
  }

  storeContacts() {
    const body = JSON.stringify(this.contacts);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.put('https://kristinadarrochcms.firebaseio.com/contacts.json'
      , body, {headers: headers}).toPromise();
  }

  compareNames(contactA: Contact, contactB: Contact) {
    return contactA.name.localeCompare(contactB.name);
  }

  getContacts() {
    return this.contacts;
  }

  getContact(idx: number) {
    return this.contacts[idx];
  }

  getCurrentContact() {
    return this.currentContact;
  }

  getContactById(id: string): Contact {
    return this.contacts.find((contact: Contact) => contact.id === id);
  }

  addContact(contact: Contact) {
    if (!contact)
      return;
    this.contacts.push(contact);
    this.contacts = this.contacts.sort(this.compareNames);
    this.storeContacts();
  }

  updateContact(oldContact: Contact, newContact: Contact) {
    if (!oldContact || !newContact) {
      return;
    }
    this.contacts[this.contacts.indexOf(oldContact)] = newContact;
    this.contacts = this.contacts.sort(this.compareNames);
    this.storeContacts();
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);
    this.contacts = this.contacts.sort(this.compareNames);
    this.storeContacts();
  }


}
