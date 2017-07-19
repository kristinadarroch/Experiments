
import {EventEmitter, Injectable} from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import {Subject} from "rxjs/Subject";


@Injectable()
export class DocumentService {
  currentDocumentObj: Document;
  currentDocumentId: string;
  maxId: number = 0;

  private documents: Document[];

  documentChangeEvent = new Subject<Document[]>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.currentDocumentId = '1';
    this.maxId = this.getMaxId();
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
    if (!document) {
      return;
    }

    this.maxId++;
    document.id = String(this.maxId);

    this.documents.push(document);
    this.documentChangeEvent.next(this.documents);
  }


  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) { // document not found in list
      return;
    }

    this.documents.splice(pos, 1);
    this.documents = [...this.documents];
    this.documentChangeEvent.next(this.documents);
  }


  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) { // original document not in list
      return;
    }

    newDocument.id = originalDocument.id; // must have the same document id
    this.documents[pos] = newDocument;
    this.documentChangeEvent.next(this.documents);
  }

  setCurrentDocument(id: string): Document {
    if (id === null) {
      this.currentDocumentObj = this.documents[0];
      return this.currentDocumentObj;
    } else {
      this.currentDocumentObj = this.getDocument(id);
    }
    return this.currentDocumentObj;
  }

  getMaxId(): number {
    let maxId = 0;
    for (let document of this.documents) {
      const id: number = parseInt(document.id, 0);
      if (id > maxId) {
        maxId = id;
      }
    }

    return maxId;
  }

}

