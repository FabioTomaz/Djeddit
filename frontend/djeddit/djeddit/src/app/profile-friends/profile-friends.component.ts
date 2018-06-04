import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-profile-friends',
  templateUrl: './profile-friends.component.html',
  styleUrls: ['./profile-friends.component.css']
})
export class ProfileFriendsComponent implements OnInit {

  constructor(titleService: Title) {
    titleService.setTitle("Friends");
  }

  ngOnInit() {
    this.getTopics(this.route.snapshot.paramMap.get("username"));
  }

  getTopics(username: string): void {
    this.topicService.getUserTopicsCreated(username).subscribe(topics => {this.topics = topics;});
  }

}
