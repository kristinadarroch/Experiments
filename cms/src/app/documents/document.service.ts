
import {EventEmitter, Injectable} from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable()
export class DocumentService {
  currentDocumentObj: Document;
  currentDocumentId: string;
  private documents: Document[];
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangeEvent = new EventEmitter<Document>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.currentDocumentId = '1';
  }

  getDocuments() {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    for (let document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }


  addDocument(document: Document) {
    if (document === null)
      return;
    this.documents.push(document);
    this.documentChangeEvent.emit(document);
  }


  deleteDocument(document: Document) {
    if (document === null) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents.splice(pos,1);
    this.documents = [...this.documents];
    this.documentChangeEvent.emit(document);
  }


  updateDocument(document: Document) {
    if (document === null)
      return;

    const pos = this.documents.indexOf(document);
    if (pos < 0)
      return;

    this.documents = [...this.documents];
    this.documentChangeEvent.emit(document);
  }

  setCurrentDocument(id: string): Document {
    if (id === null) {
      this.currentDocumentObj = this.documents[0];
      return this.currentDocumentObj;
    }
    else {
      this.currentDocumentObj = this.getDocument(id);
    }
    return this.currentDocumentObj;
  }

}
