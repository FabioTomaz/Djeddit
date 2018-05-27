import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {Topic} from './topic';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  private baseUrl = 'http://127.0.0.1:8000/ws/';
  constructor(private http: HttpClient) { }

  searchTopicsByName(name: string): Observable<Topic[]>{
    const url = this.baseUrl + 'search/topic?q=' + name;
    return this.http.get<Topic[]>(url);
  }

  getTopic(name: string): Observable<Topic> {
    const url = this.baseUrl + 'topic?name=' + name;
    return this.http.get<Topic>(url);
  }

  getTopics(): Observable<Topic[]> {
    const url = this.baseUrl + 'topics';
    return this.http.get<Topic[]>(url);
  }
}
