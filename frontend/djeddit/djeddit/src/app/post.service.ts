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

  searchPostsByTitle(title: string): Observable<Post[]>{
    const url = this.baseUrl + 'search/post?q=' + title;
    return this.http.get<Post[]>(url);
  }

  getPost(post_id: number): Observable<Post>{
    const url = this.baseUrl + 'post?post_id=' + post_id;
    return this.http.get<Post>(url);
  }

  getPosts(): Observable<Post[]>{
    const url = this.baseUrl + 'posts';
    return this.http.get<Post[]>(url);
  }

  getPostsByTopRatedOrder() {
    const url = this.baseUrl + 'posts?order=top_rated';
    return this.http.get<Post[]>(url);
  }

  getPostsByDateOrder() {
    const url = this.baseUrl + 'posts?order=new';
    return this.http.get<Post[]>(url);
  }

  getPostsByMostViewedOrder() {
    const url = this.baseUrl + 'posts?order=most_viewed';
    return this.http.get<Post[]>(url);
  }

  getPostsByControversialOrder() {
    const url = this.baseUrl + 'posts?order=controversial';
    return this.http.get<Post[]>(url);
  }
}
