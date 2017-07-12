import { Routes } from "@angular/router";

import { DocumentViewComponent } from "./document-view/document-view.component";
import { DocumentEditComponent } from "./document-edit/document-edit.component";

export const DOCUMENT_ROUTES: Routes = [
  { path: 'new', component: DocumentEditComponent },
  { path: ':id', component: DocumentViewComponent },
  { path: ':id/edit', component: DocumentEditComponent }
];
