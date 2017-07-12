import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {Contact} from "../contact";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ContactsService} from "../contacts.service";

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit, OnDestroy {

  contact: Contact;
  contactIdx: number

  subscription: Subscription;
  contactGroup: Contact[] = [];
  hasGroup: boolean = false;

  constructor(private contactService: ContactsService,
              private router: Router,
              private activatedRoute: ActivatedRoute, ) {
  }

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe(
      (param: any) => {
        this.contact = this.contactService.getContactById(param['id']);

        if (this.contact.group && this.contact.group.length > 0) {
          this.contactGroup =  this.contact.group;
          this.hasGroup = true;
        }
        else {
          this.hasGroup = false;
        }
      }
    );
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['contacts']);
  }

}
