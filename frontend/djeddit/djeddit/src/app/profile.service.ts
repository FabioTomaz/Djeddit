import { Injectable } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {HttpClient} from "@angular/common/http";
import {Profile} from "./profile";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl = 'http://127.0.0.1:8000/ws/';
  constructor(private http: HttpClient) { }

  searchProfilesByUsername(username: string): Observable<Profile[]>{
    const url = this.baseUrl + 'search/user?q=' + username;
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
}
