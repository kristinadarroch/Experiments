import { Pipe, PipeTransform } from '@angular/core';
import {forEach} from "@angular/router/src/utils/collection";
import {Contact} from "./contact";

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], [term]) {
    let filteredArray: Contact[] = [];

    filteredArray = contacts.filter(
      (contact: any) => contact.name.toLowerCase().includes(term.toLowerCase())
    );

    if (filteredArray.length < 1) {
      return contacts;
    }

    return filteredArray;
  }


}
