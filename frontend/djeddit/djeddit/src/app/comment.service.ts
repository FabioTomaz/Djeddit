import { Injectable } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {HttpClient} from "@angular/common/http";
import {Comment} from "./comment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseUrl = 'http://127.0.0.1:8000/ws/';
  constructor(private http: HttpClient) { }

  getComment(comment_id: string): Observable<Comment>{
    const url = this.baseUrl + 'comment/' + comment_id;
    return this.http.get<Comment>(url);
  }

  getComments(topic_id: number): Observable<Comment[]> {
    const url = this.baseUrl + 'comments?topic_id' + topic_id;
    return this.http.get<Comment[]>(url);
  }
}
