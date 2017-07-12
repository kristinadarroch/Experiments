import {Component, OnInit, OnDestroy} from '@angular/core';
import {DocumentsService} from "../documents.service";
import {Document} from "../document";
import {Subscription} from "rxjs";

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {

  documents: Document[] =[];
  subscription: Subscription;

  constructor(private documentsService: DocumentsService) {
    this.subscription = this.documentsService.getDocumentsEmitter.subscribe(
      ( documents: Document[]) => this.documents = documents
    );
  }

 ngOnInit() {
      this.documents = this.documentsService.getDocuments();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
