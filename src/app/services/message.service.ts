import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];
  errors: string[] = [];

  add(message: string) {
    this.clear();
    this.messages.push(message);
  }

  addError(error: string) {
    this.clear();
    this.errors.push(error);
  }

  clear() {
    this.clearErrors();
    this.clearMessages();
  }

  clearErrors() {
    this.errors = [];
  }

  clearMessages() {
    this.messages = [];
  }
}
