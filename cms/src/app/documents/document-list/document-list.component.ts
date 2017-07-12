import {Component, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import {Document} from '../document.model';
import {DocumentService} from '../document.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {

  documents: Document[] = [];
  documentId: string = '';
  private documentChangeEvent: Subscription;

  constructor(private documentService: DocumentService) {
    this.documents = this.documentService.getDocuments();
    this.documentService.documentChangeEvent;
  }

  ngOnInit() {
    this.documentChangeEvent = this.documentService.documentChangeEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    );
  }

  ngOnDestroy() {
    this.documentChangeEvent.unsubscribe();
  }

}

