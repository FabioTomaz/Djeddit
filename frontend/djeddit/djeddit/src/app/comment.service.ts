import { Injectable } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {HttpClient} from "@angular/common/http";
import {Comment} from "./Comment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseUrl = 'http://127.0.0.1:8000/ws/';
  constructor(private http: HttpClient) { }

  getComment(name: string): Observable<Comment>{
    const url = this.baseUrl + 'comment?name=' + name;
    return this.http.get<Comment>(url);
  }

  getComments(): Observable<Comment[]>{
    const url = this.baseUrl + 'comments';
    return this.http.get<Comment[]>(url);
  }
}
