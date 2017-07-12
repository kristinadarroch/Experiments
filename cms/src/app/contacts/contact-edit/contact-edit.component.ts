import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {Contact} from '../contact.model';
import {ContactService} from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})

export class ContactEditComponent implements OnInit {
  contact: Contact = null;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  hasGroup: boolean = false;
  invalidGroupContact = false;

  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        const contactId = params['id'];
        if (!contactId) {
          this.editMode = false;
          return;
        }

        this.editMode = true;
        this.contact = this.contactService.getContact(contactId);
        if (!this.contact) {
          return;
        }

        if (this.contact.group) {
          this.groupContacts = this.contact.group.slice();
          if (this.groupContacts.length > 0) {
            this.hasGroup = true;
          }
          else {
            this.hasGroup = false;
          }
        }
      }
    );
  }


  onSubmit(formData) {
    let newContact: Contact = new Contact(null,
                                          formData.name,
                                          formData.email,
                                          formData.phone,
                                          formData.imageUrl,
                                          this.groupContacts);

    if (this.editMode) {
      this.contactService.updateContact(this.contact, newContact);
    }
    else {
      this.contactService.addContact(newContact);
    }

    this.router.navigate(['/contacts']);
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }


  isInvalidContact(newContact: Contact): boolean {
    if (!newContact) {
      return true;
    }

    if (newContact.id === this.contact.id) {
      return true;
    }

    for (let currContact of this.groupContacts) {
      if (currContact.id === newContact.id) {
        return true;
      }
    }

    return false;

  }

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    if (this.isInvalidContact(selectedContact)) {
      this.invalidGroupContact = true;
      return;
    }
    // create clone of the contact object
    const clonedContact = JSON.parse(JSON.stringify(selectedContact));
    this.groupContacts.push(clonedContact);
    this.invalidGroupContact = false;
  }

  onRemoveItem(idx: number) {
    if (idx < 0 || idx >= this.groupContacts.length) {
      return; // invalid index: out of bounds
    }

    this.groupContacts.splice(idx, 1);
    this.invalidGroupContact = false;
  }

}
