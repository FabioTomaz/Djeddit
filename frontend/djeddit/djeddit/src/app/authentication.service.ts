import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user';
import {Profile} from './profile';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl = 'http://127.0.0.1:8000/ws/';

  constructor(private http: HttpClient) {

  }

  login(profile: Profile) {
    return this.http.post<Profile>(this.baseUrl + 'login/', profile.user);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  userLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  getLoggedProfile(): Profile {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  updateLoggedProfile(profile: Profile) {
    localStorage.setItem('currentUser', JSON.stringify(profile));
  }
}
