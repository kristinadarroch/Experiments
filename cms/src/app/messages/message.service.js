"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MOCKMESSAGES_1 = require("./MOCKMESSAGES");
var MessageService = (function () {
    function MessageService() {
        this.messageChangeEvent = new core_1.EventEmitter();
        this.messages = MOCKMESSAGES_1.MOCKMESSAGES;
        this.currentMessageId = '1';
    }
    MessageService.prototype.getMessage = function (id) {
        for (var i = 0; i < this.messages.length; i++) {
            if (this.messages[i].id === id) {
                this.currentMessage = this.messages[i];
                return true;
            }
        }
        return false;
    };
    MessageService.prototype.getMessages = function () {
        return this.messages.slice();
    };
    MessageService.prototype.addMessage = function (message) {
        if (message === null)
            return;
        this.messages.push(message);
        this.messageChangeEvent.emit(this.messages.slice());
    };
    MessageService.prototype.deleteMessage = function (message) {
        if (message === null) {
            return;
        }
        var pos = this.messages.indexOf(message);
        if (pos < 0) {
            return;
        }
        this.messages.splice(pos, 1);
        this.messages = this.messages.slice();
        this.messageChangeEvent.emit(this.messages.slice());
    };
    MessageService.prototype.updateMessage = function (message) {
        if (message === null)
            return;
        var pos = this.messages.indexOf(message);
        if (pos < 0)
            return;
        this.messages = this.messages.slice();
        this.messageChangeEvent.emit(this.messages.slice());
    };
    return MessageService;
}());
MessageService = __decorate([
    core_1.Injectable()
], MessageService);
exports.MessageService = MessageService;
