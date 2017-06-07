import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: any[] = [
    {
      id: '10',
      name: 'CIT 380',
      description: 'Project Management',
      url: 'http://www.byui.edu',
      children: null
    },
    {
      id: '20',
      name: 'CIT 352',
      description: 'Operating Systems 1.',
      url: 'http://www.byui.edu',
      children: null
    },
    {
      id: '30',
      name: 'CIT 301C',
      description: 'Full Stack Web Development',
      url: 'http://www.byui.edu',
      children: null
    },
    {
      id: '40',
      name: 'CIT 325',
      description: 'Database',
      url: 'http://www.byui.edu',
      children: null
    },
    {
      id: '50',
      name: 'CIT 499R',
      description: 'Python',
      url: 'http://www.byui.edu',
      children: null
    },

  ];

  constructor() { }

  ngOnInit() {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
