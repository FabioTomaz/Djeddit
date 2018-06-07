import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./user";
import {Profile} from "./profile";
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl = 'http://127.0.0.1:8000/ws/';

  constructor(private http: HttpClient) {

  }

  login(user: User) {
    return this.http.post<Profile>(this.baseUrl + 'login/', user);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  userLoggedIn(): boolean{
    return !!localStorage.getItem("currentUser");
  }

  getLoggedUser(): Profile{
    return JSON.parse(localStorage.getItem("currentUser"));
  }
}
