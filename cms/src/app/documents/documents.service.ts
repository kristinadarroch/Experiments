
import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document';
import {Headers, Http, Response} from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class DocumentsService {
  currentDocumentObj: Document;
  currentDocumentId: string;
  private documents: Document[];
  getDocumentsEmitter = new EventEmitter<Document[]>();

  constructor(private http: Http) {
    this.initDocuments();
    this.currentDocumentId = '1';
  }


  initDocuments() {
    return this.http.get('https://kristinadarrochcms.firebaseio.com/documents.json')
      .map((response: Response) => response.json())
      .subscribe(
        (data: Document[]) => {
          this.documents = data;
          this.getDocumentsEmitter.emit(this.documents);
        }
      );
  }

  storeDocuments() {
    const body = JSON.stringify(this.documents);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.put('https://kristinadarrochcms.firebaseio.com/documents.json'
      , body, {headers: headers}).subscribe();
  }

  getDocument(id: number): Document {
    return this.documents[id];
  }


  getDocuments() {
    return this.documents;
  }

  addDocument(document: Document) {
    if (document === null)
      return;
    this.documents.push(document);
    this.storeDocuments();
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);
    this.storeDocuments();
  }

  updateDocument(oldDocument: Document, newDocument: Document) {
    this.documents[this.documents.indexOf(oldDocument)] = newDocument;
    this.storeDocuments();
  }

  getDocumentPos(documentId: string) {
    let noDocuments = this.documents.length;

    for (let i=0; i<noDocuments; i++) {
      if (this.documents[i].id === documentId) {
        return i;
      }
    }
    return -1;
  }


}
