import { Injectable } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Comment} from "./comment";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseUrl = 'http://127.0.0.1:8000/ws/';
  constructor(private http: HttpClient) { }

  getComment(comment_id: string): Observable<Comment> {
    const url = this.baseUrl + 'comment/' + comment_id;
    return this.http.get<Comment>(url);
  }

  getCommentsInPost(post_id: number): Observable<Comment[]> {
    const url = this.baseUrl + 'comments?post_id=' + post_id;
    return this.http.get<Comment[]>(url);
  }

  getUserComments(username: string): Observable<Comment[]>{
    const url = this.baseUrl + "user/" + username + "/comments";
    return this.http.get<Comment[]>(url);
  }

  getUserCommentsUpvoted(username: string): Observable<Comment[]>{
    const url = this.baseUrl + "user/" + username + "/comments/upvoted";
    return this.http.get<Comment[]>(url);
  }

  getUserCommentsDownvoted(username: string): Observable<Comment[]>{
    const url = this.baseUrl + "user/" + username + "/comments/downvoted";
    return this.http.get<Comment[]>(url);
  }
}
