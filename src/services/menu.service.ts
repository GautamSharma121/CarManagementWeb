// src/app/services/menu.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private menus = {
    admin: ['Dashboard', 'Manage Users', 'Settings'],
    user: ['Dashboard', 'Profile'],
  };

  getMenu(role: 'admin' | 'user') {
    return this.menus[role];
  }
}
