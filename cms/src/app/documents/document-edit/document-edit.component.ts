import {Component, OnInit} from '@angular/core';
import {DocumentService} from '../document.service';
import {Document} from '../document.model';
import {ActivatedRoute, Router, Params} from '@angular/router';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  document: Document;
  documentIdx: number;
  originalDocument: Document;
  editMode: boolean = false;

  constructor(private documentService: DocumentService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        const id: string = params['id'];

        if (!id) {
          this.editMode = false;
          return;
        }

        this.originalDocument = this.documentService.getDocument(id);
        if (!this.originalDocument) {
          return;
        }

        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
      }
    );
  }

  onSubmit(formData) {
    let newDocument = new Document(null, formData.name, formData.description, formData.documentUrl, null);

    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    }
    else {
      this.documentService.addDocument(newDocument);
    }

    this.router.navigate(['documents']);
  }


  onCancel() {
    this.router.navigate(['/documents']);
  }

}
