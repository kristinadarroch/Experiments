import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Rx";
import {DocumentsService} from "../documents.service";
import {Document} from "../document";
import {WindowRef} from "../windRef.service";




@Component({
  selector: 'cms-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.css']
})
export class DocumentViewComponent implements OnInit {

  private subscription: Subscription;
  private document: Document;
  private documentIdx: number;
  private nativeWindow: any

  constructor(private documentsService: DocumentsService,
              private router: Router,
              private route: ActivatedRoute,
              private winRef: WindowRef
              )
  {
    this.nativeWindow = winRef.getNativeWindow();
  }


  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.documentIdx = params['id'];
        this.document = this.documentsService.getDocument(this.documentIdx);
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  displayDocument(index: number) {
    this.document = this.documentsService.getDocument(index);

    if (!this.document) {
      return;
    }

    let currentUrl = this.document.url;
    var newWindow = this.nativeWindow.open(currentUrl);

  }

  onView() {
    if (!this.document) {
      return;
    }

    let currentUrl = this.document.url;
    var newWindow = this.nativeWindow.open(currentUrl);
  }

  onDelete() {
    if (!this.document) {
      return;
    }

    this.documentsService.deleteDocument(this.document);
    this.router.navigate(['../'])
  }


}
