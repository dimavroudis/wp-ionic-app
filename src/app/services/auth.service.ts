import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { catchError, map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user?: {
    token: string,
    user_email: string,
    user_nicename: string,
    user_display_name: string,
  };

  isLoggedIn = new BehaviorSubject(false);

  constructor(private api: ApiService, private storage: Storage) {
    this.storage.get('user').then(data => {
      if(!data){
        return;
      }
      this.validateToken(data.token).subscribe(
        () => this.setUser(data),
        () => this.logOut()
      );
    })
  }

  isAuthPluginActivated(): Observable<any> {
    return this.api.get('jwt-auth/v1').pipe(
      map(res => {
        return res.code === 'rest_no_route';
      })
    );
  }

  validateToken(token) {
    return this.api.post('jwt-auth/v1/token/validate', {}, { headers: { 'Authorization': `Bearer ${token}` } });
  }

  private setUser(data) {
    this.user = data;
    this.isLoggedIn.next(true);
    this.api.setHeader({ 'Authorization': `Bearer ${this.user.token}` });
  }

  login(username, password): Observable<any> {
    return this.api.post('jwt-auth/v1/token', { username, password }).pipe(
      map(res => {
        if (res.token) {
          this.setUser(res);
          this.storage.set('user', res);
          return res;
        } else {
          return Error('Unexpexted Error while logging in');
        }
      })
    );
  }

  logOut(): boolean {
    this.user = null;
    this.isLoggedIn.next(false);
    this.api.unsetHeader('Authorization');
    this.storage.remove('user');
    return true;
  }

}
