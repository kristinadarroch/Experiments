"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MOCKCONTACTS_1 = require("./MOCKCONTACTS");
var ContactService = (function () {
    function ContactService() {
        this.contacts = [];
        this.currentContact = null;
        this.contactSelectedEvent = new core_1.EventEmitter();
        this.contactsChangeEvent = new core_1.EventEmitter();
        this.contacts = MOCKCONTACTS_1.MOCKCONTACTS;
        this.contacts = this.contacts.sort(this.compareNames);
        this.currentContact = this.getContact("7");
    }
    ContactService.prototype.getContacts = function () {
        return this.contacts.slice();
    };
    ContactService.prototype.compareNames = function (contactA, contactB) {
        if (contactA.name < contactB.name)
            return -1;
        if (contactA.name > contactB.name)
            return 1;
        return 0;
    };
    ContactService.prototype.getContact = function (id) {
        for (var _i = 0, _a = this.contacts; _i < _a.length; _i++) {
            var contact = _a[_i];
            if (contact.id === id) {
                return contact;
            }
        }
        return null;
    };
    ContactService.prototype.addContact = function (contact) {
        if (contact === null)
            return;
        this.contacts.push(contact);
        this.contactsChangeEvent.emit(this.contacts);
    };
    ContactService.prototype.deleteContact = function (contact) {
        if (contact === null) {
            return;
        }
        var pos = this.contacts.indexOf(contact);
        if (pos < 0) {
            return;
        }
        this.contacts.splice(pos, 1);
        this.contacts = this.contacts.slice();
        this.contactsChangeEvent.emit(this.contacts);
    };
    ContactService.prototype.updateContact = function (contact) {
        if (contact === null)
            return;
        var pos = this.contacts.indexOf(contact);
        if (pos < 0)
            return;
        this.contacts = this.contacts.slice();
        this.contactsChangeEvent.emit(this.contacts);
    };
    return ContactService;
}());
ContactService = __decorate([
    core_1.Injectable()
], ContactService);
exports.ContactService = ContactService;
