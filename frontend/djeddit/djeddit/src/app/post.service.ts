import { Injectable } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Post} from "./post";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl = 'http://127.0.0.1:8000/ws/';
  constructor(private http: HttpClient) { }

  getPost(post_id: number): Observable<Post>{
    const url = this.baseUrl + 'post?post_id=' + post_id;
    return this.http.get<Post>(url);
  }

  getPosts(): Observable<Post[]>{
    const url = this.baseUrl + 'posts';
    return this.http.get<Post[]>(url);
  }
}
