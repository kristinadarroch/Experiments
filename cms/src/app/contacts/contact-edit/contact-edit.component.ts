import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {Contact} from "../contact";
import {ContactsService} from "../contacts.service";
import {Router, ActivatedRoute} from "@angular/router";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})

export class ContactEditComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private editMode: boolean = false;
  private hasGroup: boolean = false;
  private contactId: string;
  private contact: Contact;
  private groupContacts: Contact[] = [];
  private invalidGroupContact: boolean = true;

  constructor(private contactsService: ContactsService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.editMode = false;
    this.hasGroup = false;
    this.invalidGroupContact = false;
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        if (params.hasOwnProperty('id')) {
          this.contactId = params['id'];
          this.contact = this.contactsService.getContactById(this.contactId);
          this.editMode = true;
          if (this.contact.group && this.contact.group.length > 0) {
            this.hasGroup = true;
            this.groupContacts = this.contact.group.slice();

          }
        }
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  onSubmit(value) {
    const newContact = new Contact("", value.name, value.email, value.phone, value.imageUrl, this.groupContacts);

    if (this.editMode) {
      newContact.id = this.contact.id;
      this.contactsService.updateContact(this.contact, newContact);
    }
    else {
      this.contactsService.addContact(newContact);
    }
    this.router.navigate(['contacts']);
  }

  onCancel() {
    this.router.navigate(['contacts']);
  }

  onRemoveItem(idx: number) {
    // If contact is outsides the bounds of the array
    if (idx < 0 || idx >= this.groupContacts.length)
      return;

    this.groupContacts.splice(idx, 1);
    this.invalidGroupContact = false;
  }

  addToGroup($event: any) {
    let selectedContact: Contact = $event.dragData;
    this.invalidGroupContact = this.isInvalidContact(selectedContact);
    if (this.invalidGroupContact) {
      return;
    }
    this.groupContacts.push(selectedContact);
    this.invalidGroupContact = false;
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) { // newContact has no value?
      return true;
    }

    if (newContact.id === this.contact.id) {
      return true;
    }

    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }

}

