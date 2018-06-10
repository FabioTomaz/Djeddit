import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Topic} from "../topic";
import {TopicService} from "../topic.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-profile-topics-subscribed',
  templateUrl: './profile-topics-subscribed.component.html',
  styleUrls: ['./profile-topics-subscribed.component.css']
})
export class ProfileTopicsSubscribedComponent implements OnInit {

  topics: Topic[];

  constructor(private route: ActivatedRoute,
              private topicService: TopicService,
              private titleService: Title) { }

  ngOnInit() {
    this.getTopics(this.route.snapshot.paramMap.get("username"));
    this.titleService.setTitle(this.route.snapshot.paramMap.get("username") + ": Topics Subscribed");
  }

  getTopics(username: string): void {
    this.topicService.getUserTopicsSubscribed(username).subscribe(topics => {this.topics = topics;});
  }

}
