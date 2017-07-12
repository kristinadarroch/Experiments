import { Routes } from "@angular/router";

import { ContactDetailComponent } from "./contact-detail/contact-detail.component";
import {ContactEditComponent} from "./contact-edit/contact-edit.component";

export const CONTACT_ROUTES: Routes = [
  { path: 'new', component: ContactEditComponent },
  { path: ':id/detail', component: ContactDetailComponent },
  { path: ':id/edit', component: ContactEditComponent },
];

