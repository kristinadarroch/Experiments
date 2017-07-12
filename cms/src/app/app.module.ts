import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {HeaderComponent} from "./header.component";
import {ContactsComponent} from "./contacts/contacts.component";
import {ContactDetailComponent} from "./contacts/contact-detail/contact-detail.component";
import {ContactListComponent} from "./contacts/contact-list/contact-list.component";
import {ContactItemComponent} from "./contacts/contact-list/contact-item.component";
import {DocumentsComponent} from "./documents/documents.component";
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { ContactGroupItemComponent } from './contacts/contact-group-item.component';

import {DocumentListComponent} from "./documents/document-list/document-list.component";
import {DocumentItemComponent} from "./documents/document-list/document-item.component";
import {DocumentViewComponent} from "./documents/document-view/document-view.component";
import {DocumentEditComponent} from "./documents/document-edit/document-edit.component";

import {MessagesComponent} from "./messages/messages.component";
import {MessageListComponent} from "./messages/message-list/message-list.component";
import {MessageItemComponent} from "./messages/message-list/message-item.component";
import {MessageNewComponent} from "./messages/message-new/message-new.component";

import {MessagesService} from "./messages/messages.service";
import {DocumentsService} from "./documents/documents.service";
import {ContactsService} from "./contacts/contacts.service";
import {DropdownDirective} from "./dropdown.directive";
import {WindowRef} from "./documents/windRef.service";
import { ContactsFilterPipe } from './contacts/contacts-filter.pipe';

import {routing} from "./app.routing";
import {DndModule} from 'ng2-dnd';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    ContactDetailComponent,
    ContactListComponent,
    ContactItemComponent,
    ContactEditComponent,
    ContactGroupItemComponent,
    DocumentsComponent,
    DocumentListComponent,
    DocumentItemComponent,
    MessagesComponent,
    MessageListComponent,
    MessageItemComponent,
    HeaderComponent,
    DropdownDirective,
    MessageNewComponent,
    DocumentViewComponent,
    DocumentEditComponent,
    DropdownDirective,
    ContactsFilterPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DndModule.forRoot(),
    routing
  ],
  providers: [MessagesService, DocumentsService, ContactsService, WindowRef],
  bootstrap: [AppComponent]
})

export class AppModule { }
