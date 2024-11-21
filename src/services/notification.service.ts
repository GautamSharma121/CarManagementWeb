// src/app/services/notification.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  showMessage(message: string) {
    alert(message); // Replace with a toast/notification library for better UX
  }
}
