import { Injectable } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {HttpClient} from "@angular/common/http";
import {Friend} from "./friend";

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  private baseUrl = 'http://127.0.0.1:8000/ws/';
  constructor(private http: HttpClient) { }

  getFriend(name: string): Observable<Friend>{
    const url = this.baseUrl + 'friend?name=' + name;
    return this.http.get<Friend>(url);
  }

  getFriends(): Observable<Friend[]>{
    const url = this.baseUrl + 'friends';
    return this.http.get<Friend[]>(url);
  }

}
