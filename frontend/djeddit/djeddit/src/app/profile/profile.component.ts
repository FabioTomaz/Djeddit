import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProfileService} from "../profile.service";
import {Profile} from "../profile";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username: string;
  profile: Profile = new Profile();
  friends: Profile[] = [];

  constructor(private route: ActivatedRoute,
              private profileService: ProfileService,
              private authService: AuthenticationService) { }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');
    this.profileService.getFriends(this.username).subscribe(users => {this.friends = users;});
    this.profileService.getProfileByUsername(this.username).subscribe(profile => {this.profile = profile})
  }

  checkAuth(){
    return this.authService.userLoggedIn();
  }

  userIsProfile(){
    return this.checkAuth() && this.authService.getLoggedProfile().user.id===this.profile.user.id;
  }

  checkCommentsPermission() {
    if (this.userIsProfile()){
      return true;
    } else {
      switch(this.profile.profile_comments_permission) {
        case "F": {
          for(let friend of this.friends){
            if (this.checkAuth() && friend.user.id === this.authService.getLoggedProfile().user.id)
              return true;
          }
          return false;
        }
        case "E": {
          return true;
        }
        case "N": {
          return false;
        }
        default: {
          return false;
        }
      }
    }
  }

  checkPostsPermission() {
    if (this.userIsProfile()){
      return true;
    } else {
      switch(this.profile.profile_posts_permission) {
        case "F": {
          for(let friend of this.friends){
            if (this.checkAuth() && friend.user.id === this.authService.getLoggedProfile().user.id)
              return true;
          }
          return false;
        }
        case "E": {
          return true;
        }
        case "N": {
          return false;
        }
        default: {
          return false;
        }
      }
    }
  }

  checkTopicsPermission() {
    if (this.userIsProfile()){
      return true;
    } else {
      switch (this.profile.profile_topics_permission) {
        case "F": {
          for (let friend of this.friends) {
            if (this.checkAuth() && friend.user.id === this.authService.getLoggedProfile().user.id)
              return true;
          }
          return false;
        }
        case "E": {
          return true;
        }
        case "N": {
          return false;
        }
        default: {
          return false;
        }
      }
    }
  }

  checkFriendsPermission() {
    if (this.userIsProfile()){
      return true;
    } else {
      switch (this.profile.profile_friends_permission) {
        case "F": {
          for (let friend of this.friends) {
            if (this.checkAuth() && friend.user.id === this.authService.getLoggedProfile().user.id)
              return true;
          }
          return false;
        }
        case "E": {
          return true;
        }
        case "N": {
          return false;
        }
        default: {
          return false;
        }
      }
    }
  }
}
