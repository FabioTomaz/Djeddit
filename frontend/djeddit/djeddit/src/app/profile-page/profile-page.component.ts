import {Component, OnDestroy, OnInit} from '@angular/core';
import {Profile} from "../profile";
import {ActivatedRoute, Router} from "@angular/router";
import {ProfileService} from "../profile.service";
import {Observable} from "rxjs/internal/Observable";
import {Subscription} from "rxjs/internal/Subscription";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit{

  profile: Profile;
  friends: Profile[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private profileService: ProfileService,
              private authService: AuthenticationService) { }

  ngOnInit() {
    this.getProfile(this.route.snapshot.paramMap.get("username"));
  }

  getProfile(username: string){
    this.profileService.getProfileByUsername(username).subscribe((profile) => {
      this.profileService.getFriends(username).subscribe((friends) => {
        this.profile = profile;
        this.profile.user_picture = "http://127.0.0.1:8000" + this.profile.user_picture;
        this.friends = friends;
        console.log(this.friends);
      });
    });
  }

  getKarmaDescription(): string{
    return "${profile.karma_posts} Post Points and ${profile.karma_comments} Comment Points";
  }

  addFriend(){

  }

  removeFriend(){

  }

  userIsFriend(): boolean{
    return this.friends.includes(this.authService.getLoggedUser());
  }

  loggedUserEqualsUser(): boolean{
    return this.profile.user.username === this.authService.getLoggedUser().user.username;
  }

  userLoggedIn(): boolean{
    return this.authService.userLoggedIn();
  }

}
