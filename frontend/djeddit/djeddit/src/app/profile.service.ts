import { Injectable } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Profile} from "./profile";
import {User} from "./user";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl = 'http://127.0.0.1:8000/ws/';
  constructor(private http: HttpClient) { }

  searchProfiles(username: string, name: string, email: string, orderby: string ): Observable<Profile[]>{
    const url = this.baseUrl + 'search/user?q=' + username + '&name=' + name + '&email=' + email + '&orderby=' + orderby;
    return this.http.get<Profile[]>(url);
  }

  getProfileByUsername(name: string): Observable<Profile>{
    const url = this.baseUrl + 'profile/' + name;
    return this.http.get<Profile>(url);
  }

  getProfiles(): Observable<Profile[]>{
    const url = this.baseUrl + 'profiles';
    return this.http.get<Profile[]>(url);
  }

  create(profile: User): Observable<Profile>{
    console.log(profile);
    const url = this.baseUrl + 'profile/create';
    return this.http.post<Profile>(url, profile, httpOptions);
  }

  image_update(userID, image: File): Observable<any>{
    const url = this.baseUrl + 'profile/' + userID + '/update/image';
    let fd = new FormData();
    fd.append("user_picture", image, image.name);
    return this.http.post(url, fd);
  }

  privacy_update(profile: Profile): Observable<any>{
    const url = this.baseUrl + 'profile/update/privacy';
    return this.http.put(url, profile, httpOptions);
  }

  update(profile: Profile): Observable<any>{
    const url = this.baseUrl + 'profile/update';
    return this.http.put(url, profile, httpOptions);
  }

  getFriends(username: string): Observable<Profile[]>{
    const url = this.baseUrl + 'user/' + username + '/friends';
    return this.http.get<Profile[]>(url);
  }

  addFriend(username: string, friend: string): Observable<any>{
    const url = this.baseUrl + 'user/' + username + '/add_friend';
    let data = {
      "username": friend
    };
    return this.http.post<any>(url, data, httpOptions);
  }

  removeFriend(username: string, friend: string): Observable<any>{
    const url = this.baseUrl + 'user/' + username + '/remove_friend';
    let data = {
      "username": friend
    };
    return this.http.post<any>(url, data, httpOptions);
  }

  changePassword(username: string, oldPassword: string, newPassword: string): Observable<any>{
    const url = this.baseUrl + 'user/' + username + '/change_password';
    let data = {
      "old_password": oldPassword,
      "new_password": newPassword
    };
    return this.http.put(url, data, httpOptions);
  }

}
