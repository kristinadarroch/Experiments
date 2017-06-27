"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var message_model_1 = require("../message.model");
var MessageEditComponent = (function () {
    function MessageEditComponent(messageService, contactService) {
        this.messageService = messageService;
        this.contactService = contactService;
    }
    MessageEditComponent.prototype.ngOnInit = function () {
    };
    MessageEditComponent.prototype.onSendMessage = function () {
        var subject = this.subjectElement.nativeElement.value;
        var msgText = this.msgTextElement.nativeElement.value;
        var sender = this.contactService.currentContact.id;
        var message = new message_model_1.Message("", subject, msgText, sender);
        this.messageService.addMessage(message);
        this.onClear();
    };
    MessageEditComponent.prototype.onClear = function () {
        this.subjectElement.nativeElement.value = " ";
        this.msgTextElement.nativeElement.value = " ";
        this.subjectElement.nativeElement.focus();
    };
    return MessageEditComponent;
}());
__decorate([
    core_1.ViewChild('subject')
], MessageEditComponent.prototype, "subjectElement", void 0);
__decorate([
    core_1.ViewChild('msgText')
], MessageEditComponent.prototype, "msgTextElement", void 0);
MessageEditComponent = __decorate([
    core_1.Component({
        selector: 'cms-message-edit',
        templateUrl: './message-edit.component.html',
        styleUrls: ['./message-edit.component.css']
    })
], MessageEditComponent);
exports.MessageEditComponent = MessageEditComponent;
