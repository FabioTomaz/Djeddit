import { Injectable } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Post} from "./post";
import {Profile} from './profile';
import {Topic} from './topic';

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

  createPost(post: Post): Observable<Post> {
    const url = this.baseUrl + 'create_post/';
    return this.http.post<Post>(url, post, httpOptions);
  }

  savePost(postID: number, profile: Profile): Observable<Post>{
    const url = this.baseUrl + 'post/' + postID + '/save';
    return this.http.post<Post>(url, profile.user.id, httpOptions);
  }

  unsavePost(postID: number, profile: Profile): Observable<Post>{
    const url = this.baseUrl + 'post/' + postID + '/unsave';
    return this.http.post<Post>(url, profile.user.id, httpOptions);
  }

  hidePost(postID: number, profile: Profile): Observable<Post>{
    const url = this.baseUrl + 'post/' + postID + '/hide';
    return this.http.post<Post>(url, profile.user.id, httpOptions);
  }

  unhidePost(postID: number, profile: Profile): Observable<Post>{
    const url = this.baseUrl + 'post/' + postID + '/unhide';
    return this.http.post<Post>(url, profile.user.id, httpOptions);
  }

  votePost(postID: number, profile: Profile, vote: string) {
    const url = this.baseUrl + 'post/' + postID + '/vote_post';
    return this.http.post<Post>(url, profile, httpOptions);
  }
}
