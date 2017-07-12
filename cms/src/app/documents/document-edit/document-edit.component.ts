import { Component, OnInit, OnDestroy } from '@angular/core';
import {DocumentsService} from "../documents.service";
import {Document} from "../document";
import {Router, ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',

})
export class DocumentEditComponent implements OnInit {

  subscription: Subscription;
  oldDocument: Document;
  editMode: boolean = false;

  constructor(private documentsService: DocumentsService ,
              private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.editMode = false;
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        if (params.hasOwnProperty('id')) {
          let documentIdx = params['id'];
          this.oldDocument = this.documentsService.getDocument(documentIdx);
          this.editMode = true;
        }
        else {
          this.editMode = false;
        }
      }
    )
  }

  onCancel() {
    this.router.navigate(['documents']);
  }

  onSubmit(value) {
    let newDocument = new Document(null,
                                   value.name,
                                   value.description,
                                   value.documentUrl);
    if (this.editMode) {
      newDocument.id = this.oldDocument.id;
      this.documentsService.updateDocument(this.oldDocument, newDocument);
    }
    else {
      this.documentsService.addDocument(newDocument);
    }

    this.router.navigate(['documents']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
