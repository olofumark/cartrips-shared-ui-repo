import { Injectable } from '@angular/core';

export interface ToastInfo {
  header: string;
  body: string;
  class?: string;
  delay?: number;
}





@Injectable({
  providedIn: 'root'
})
export class AppToastService {

  constructor() { }

  toasts: ToastInfo[] = [];

  show(header: string, body: string) {
    // this.toasts.push({ header, body , class: "bg-danger text-light"});
    this.toasts.push({ header, body , class: "bg-light"});
  }

  remove(toast: ToastInfo) {
    this.toasts = this.toasts.filter(t => t != toast);
  }
}
