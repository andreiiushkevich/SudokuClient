import {EventEmitter, Injectable, Output} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Guid} from 'guid-typescript';

@Injectable()
export class IdentityService {
  private USER_NAME = 'user-name';
  private USER_ID = 'user-id';

  public changed = new EventEmitter<boolean>();

  constructor(private cookieService: CookieService) {
    console.log('IdentityService');
    const id = Guid.create().toString();
    this.cookieService.set(this.USER_ID, id);
  }

  public setUser(name: string) {
    this.cookieService.set(this.USER_NAME, name);
    this.changed.emit(true);
  }

  public removeUser() {
    this.cookieService.delete(this.USER_NAME);
    this.changed.emit(false);
  }

  public check(): boolean {
    return this.cookieService.check(this.USER_ID) && this.cookieService.check(this.USER_NAME);
  }

  public getUser(): string {
    return this.cookieService.get(this.USER_NAME);
  }

  public getId(): string {
    return this.cookieService.get(this.USER_ID);
  }
}
