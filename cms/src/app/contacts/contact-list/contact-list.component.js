"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ContactListComponent = (function () {
    function ContactListComponent(contactService) {
        this.contactService = contactService;
        this.contact = null;
        this.contacts = [];
        this.contacts = this.contactService.getContacts();
    }
    ContactListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.contactService.contactsChangeEvent.subscribe(function (contacts) {
            _this.contacts = contacts;
        });
    };
    ContactListComponent.prototype.onSelected = function (contact) {
        this.contactService.contactSelectedEvent.emit(contact);
    };
    ContactListComponent.prototype.getContacts = function () {
        return this.contacts;
    };
    ContactListComponent.prototype.compareNames = function (contactA, contactB) {
        if (contactA.name < contactB.name)
            return -1;
        if (contactA.name > contactB.name)
            return 1;
        return 0;
    };
    return ContactListComponent;
}());
ContactListComponent = __decorate([
    core_1.Component({
        selector: 'cms-contact-list',
        templateUrl: './contact-list.component.html',
        styleUrls: ['./contact-list.component.css']
    })
], ContactListComponent);
exports.ContactListComponent = ContactListComponent;
