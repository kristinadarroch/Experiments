import { Routes, RouterModule } from "@angular/router";

import { ContactsComponent } from "./contacts/contacts.component";
import { DocumentsComponent } from "./documents/documents.component";
import { MessagesComponent } from "./messages/messages.component";
import { CONTACT_ROUTES } from "./contacts/contact-routes";
import { DOCUMENT_ROUTES } from "./documents/document-routes";
import { MESSAGE_ROUTES } from "./messages/message-routes";

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/documents', pathMatch: 'full' },
  { path: 'contacts', component: ContactsComponent, pathMatch: 'full' },
  { path: 'contacts', component: ContactsComponent, children: CONTACT_ROUTES },
  { path: 'documents', component: DocumentsComponent, children: DOCUMENT_ROUTES },
  { path: 'messages', component: MessagesComponent, pathMatch: 'full'},
  { path: 'messages', component: MessagesComponent, children: MESSAGE_ROUTES },



  // { path: '**', redirectTo: '/documents' },
];

export const routing = RouterModule.forRoot(APP_ROUTES);
