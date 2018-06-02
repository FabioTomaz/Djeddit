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

  searchPosts(title: string, op: string, from_topic: string, orderby: string ): Observable<Post[]> {
    const url = this.baseUrl + 'search/post?q=' + title + '&op=' + op + '&from_topic=' + from_topic + '&orderby=' + orderby;
    return this.http.get<Post[]>(url);
  }

  getPost(post_id: number): Observable<Post>{
    const url = this.baseUrl + 'post/' + post_id;
    return this.http.get<Post>(url);
  }

  getPosts(): Observable<Post[]>{
    const url = this.baseUrl + 'posts';
    return this.http.get<Post[]>(url);
  }

  getUserPosts(username: string): Observable<Post[]>{
    const url = this.baseUrl + "user/" + username + "/posts";
    return this.http.get<Post[]>(url);
  }

  getUserPostsSaved(username: string): Observable<Post[]>{
    const url = this.baseUrl + "user/" + username + "/posts/saved";
    return this.http.get<Post[]>(url);
  }

  getUserPostsHidden(username: string): Observable<Post[]>{
    const url = this.baseUrl + "user/" + username + "/posts/hidden";
    return this.http.get<Post[]>(url);
  }

  getUserPostsUpvoted(username: string): Observable<Post[]>{
    const url = this.baseUrl + "user/" + username + "/posts/upvoted";
    return this.http.get<Post[]>(url);
  }

  getUserPostsDownvoted(username: string): Observable<Post[]>{
    const url = this.baseUrl + "user/" + username + "/posts/downvoted";
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
