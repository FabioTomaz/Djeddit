import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {Topic} from './topic';
import {Post} from "./post";

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  private baseUrl = 'http://127.0.0.1:8000/ws/';
  constructor(private http: HttpClient) { }

  searchTopics(name: string, user_creator: string, orderby: string): Observable<Topic[]>{
    const url = this.baseUrl + 'search/topic?q=' + name + '&user_creator=' + user_creator + '&orderby=' + orderby;
    return this.http.get<Topic[]>(url);
  }

  getTopic(name: string): Observable<Topic> {
    const url = this.baseUrl + 'topic/' + name;
    return this.http.get<Topic>(url);
  }

  getTopics(): Observable<Topic[]> {
    const url = this.baseUrl + 'topics';
    return this.http.get<Topic[]>(url);
  }

  getUserTopicsCreated(username: string): Observable<Topic[]>{
    const url = this.baseUrl + "user/" + username + "/topics/created";
    return this.http.get<Topic[]>(url);
  }

  getUserTopicsSubscribed(username: string): Observable<Topic[]>{
    const url = this.baseUrl + "user/" + username + "/topics";
    return this.http.get<Topic[]>(url);
  }
}
