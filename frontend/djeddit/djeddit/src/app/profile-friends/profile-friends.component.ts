import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {User} from "../user";
import {ProfileService} from "../profile.service";
import {Profile} from "../profile";

@Component({
  selector: 'app-profile-friends',
  templateUrl: './profile-friends.component.html',
  styleUrls: ['./profile-friends.component.css']
})
export class ProfileFriendsComponent implements OnInit {

  username: string;
  friends: Profile[];

  constructor(private titleService: Title, private route: ActivatedRoute, private profileService: ProfileService ) {

  }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get("username");
    this.getFriends(this.username);
    this.titleService.setTitle(this.username + " Friends");
  }

  getFriends(username: string): void {
    this.profileService.getFriends(username).subscribe(users => {this.friends = users;});
  }

}
