import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  getLogin() {
    return this.localStorage.retrieve('login');
  }

  log() {
    if (this.localStorage.retrieve('login')) {
      this.router.navigate(['']);
    }
  }

  logCheck() {
    if (!this.localStorage.retrieve('login')) {
      this.router.navigate(['login']);
      return false;
    } else {
      return true;
    }
  }

  login(value) {
    this.localStorage.store('login', value);
  }

  logOut() {
    this.localStorage.clear('login');
    this.router.navigate(['login']);
  }
}
