import { Component, OnChanges, Input } from '@angular/core';
import {Contact} from "../contact.model";

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnChanges {

  @Input() contact: Contact;
  contactGroup: Contact[] = []

  constructor() {
    this.contact = new Contact("", "", "", "", "", []);

  }

  ngOnChanges() {
    this.contactGroup = this.contact.group;
  }

}
