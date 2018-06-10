import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {ProfileService} from "../profile.service";
import {Profile} from "../profile";

@Component({
  selector: 'app-user-privacy',
  templateUrl: './user-privacy.component.html',
  styleUrls: ['./user-privacy.component.css']
})
export class UserPrivacyComponent implements OnInit {

  profile: Profile = new Profile();

  privacyChoices = [
    {id: 'N', name: "None"},
    {id: 'F', name: "Friends"},
    {id: 'E', name: "Everybody"}
  ];

  constructor(private titleService: Title,
              private route: ActivatedRoute,
              private profileService: ProfileService) { }

  ngOnInit() {
    this.titleService.setTitle(this.route.snapshot.paramMap.get("username") + ": Privacy");
    this.profileService.getProfileByUsername(this.route.snapshot.paramMap.get("username")).subscribe(
      (profile) => {
        this.profile = profile;
      }
    )
  }

  onChangePrivacy() {
    this.profileService.privacy_update(this.profile).subscribe(
      () => {

      },
      (error) => {
        console.log(error);
      }
    )
  }
}
