import {Component, OnDestroy, OnInit} from '@angular/core';
import {Profile} from "../profile";
import {ActivatedRoute, Router} from "@angular/router";
import {ProfileService} from "../profile.service";
import {Observable} from "rxjs/internal/Observable";
import {Subscription} from "rxjs/internal/Subscription";
import {AuthenticationService} from "../authentication.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit{

  profile: Profile = new Profile();
  friends: Profile[] = [];
  isFriend: boolean = false;
  isUser: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private profileService: ProfileService,
              private authService: AuthenticationService,
              private titleService: Title) { }

  ngOnInit() {
    this.getProfile(this.route.snapshot.paramMap.get("username"));
    this.titleService.setTitle(this.route.snapshot.paramMap.get("username") + " Profile Page");
  }

  getProfile(username: string){
    this.profileService.getProfileByUsername(username).subscribe((profile) => {
      this.profileService.getFriends(username).subscribe((friends) => {
        this.profile = profile;
        this.profile.user_picture = "http://127.0.0.1:8000" + this.profile.user_picture;
        this.friends = friends;
        for(let friend of this.friends){
          if (friend.user.id === this.authService.getLoggedProfile().user.id)
            this.isFriend = true;
        }
        this.isUser = this.profile.user.username === this.authService.getLoggedProfile().user.username;
      });
    });
  }

  getKarmaDescription(): string{
    return "${profile.karma_posts} Post Points and ${profile.karma_comments} Comment Points";
  }

  addFriend(){
    this.profileService.addFriend(this.authService.getLoggedProfile().user.username, this.profile.user.username).subscribe(
      () => {
          this.isFriend = true;
        },
      (error)=> {
        console.log(error);
      }
    )
  }

  removeFriend(){
    this.profileService.removeFriend(this.authService.getLoggedProfile().user.username, this.profile.user.username).subscribe(
      () => {
        this.isFriend = false;
      },
      (error)=> {
        console.log(error);
      }
    )
  }

  userLoggedIn(): boolean{
    return this.authService.userLoggedIn();
  }

  userIsProfile(){
    return this.userLoggedIn() && this.authService.getLoggedProfile().user.id===this.profile.user.id;
  }

  checkInfoPermission() {
    if (this.userIsProfile()){
      return true;
    } else {
      switch(this.profile.profile_info_permission) {
        case "F": {
          for(let friend of this.friends){
            if (this.userLoggedIn() && friend.user.id === this.authService.getLoggedProfile().user.id)
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
