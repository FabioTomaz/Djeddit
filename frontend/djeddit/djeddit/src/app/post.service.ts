import { Injectable } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {HttpClient} from "@angular/common/http";
import {Post} from "./post";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl = 'http://127.0.0.1:8000/ws/';
  constructor(private http: HttpClient) { }

  getPost(name: string): Observable<Post>{
    const url = this.baseUrl + 'post?name=' + name;
    return this.http.get<Post>(url);
  }

  getPosts(): Observable<Post[]>{
    const url = this.baseUrl + 'posts';
    return this.http.get<Post[]>(url);
  }
}
