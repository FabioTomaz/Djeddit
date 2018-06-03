import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl = 'http://127.0.0.1:8000/ws/';

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>(this.baseUrl + '/ws/login', { username: username, password: password })
      .pipe(user => {
        // login successful if there's a jwt token in the response
        if (user) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
