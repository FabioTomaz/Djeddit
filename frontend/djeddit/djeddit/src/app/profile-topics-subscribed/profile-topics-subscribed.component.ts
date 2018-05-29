import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Topic} from "../topic";
import {TopicService} from "../topic.service";

@Component({
  selector: 'app-profile-topics-subscribed',
  templateUrl: './profile-topics-subscribed.component.html',
  styleUrls: ['./profile-topics-subscribed.component.css']
})
export class ProfileTopicsSubscribedComponent implements OnInit {

  topics: Topic[];

  constructor(private route: ActivatedRoute, private topicService: TopicService) { }

  ngOnInit() {
    this.getTopics(this.route.snapshot.paramMap.get("username"));
  }

  getTopics(username: string): void {
    this.topicService.getUserTopicsSubscribed(username).subscribe(topics => {this.topics = topics;});
  }

}
