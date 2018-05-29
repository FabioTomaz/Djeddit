import {Component, OnDestroy, OnInit} from '@angular/core';
import {Profile} from "../profile";
import {ActivatedRoute, Router} from "@angular/router";
import {ProfileService} from "../profile.service";
import {Observable} from "rxjs/internal/Observable";
import {Subscription} from "rxjs/internal/Subscription";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit{

  profile: Profile;

  username: string;

  constructor(private route: ActivatedRoute, private router: Router, private profileService: ProfileService) { }

  ngOnInit() {
    this.getProfile(this.route.parent.snapshot.paramMap.get("username"));
  }

  getProfile(username: string){
    this.profileService.getProfileByUsername(username).subscribe((profile) => {
      this.profile = profile;
      this.profile.user_picture = "http://127.0.0.1:8000" + this.profile.user_picture;
    });
  }

  getKarmaDescription(): string{
    return "${profile.karma_posts} Post Points and ${profile.karma_comments} Comment Points";
  }

}
