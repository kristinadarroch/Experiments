import {Component, OnInit} from '@angular/core';
import {Document} from "../document.model";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {DocumentService} from "../document.service";
import {WindRefService} from "../../wind-ref.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})

export class DocumentDetailComponent implements OnInit {
  document: Document;
  nativeWindow: any;

  constructor(private documentService: DocumentService,
              private windowRefService: WindRefService,
              private router: Router,
              private route: ActivatedRoute) {
    this.nativeWindow = windowRefService.getNativeWindow();
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        let documentId = params['id'];
        this.document = this.documentService.getDocument(documentId);
      }
    );
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }


  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents'])
  }
}


