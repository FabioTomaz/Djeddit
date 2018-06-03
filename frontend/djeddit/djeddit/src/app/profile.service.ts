import { Injectable } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Profile} from "./profile";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl = 'http://127.0.0.1:8000/ws/';
  constructor(private http: HttpClient) { }

  searchProfiles(username: string, name: string, email: string, orderby: string ): Observable<Profile[]>{
    const url = this.baseUrl + 'search/user?q=' + username + '&name=' + name + '&email=' + email + '&orderby=' + orderby;
    return this.http.get<Profile[]>(url);
  }

  getProfileByUsername(name: string): Observable<Profile>{
    const url = this.baseUrl + 'profile/' + name;
    return this.http.get<Profile>(url);
  }

  getProfiles(): Observable<Profile[]>{
    const url = this.baseUrl + 'profiles';
    return this.http.get<Profile[]>(url);
  }

  create(profile: Profile): Observable<Profile>{
    const url = this.baseUrl + 'profile';
    return this.http.post<Profile>(url, profile, httpOptions);
  }
}
