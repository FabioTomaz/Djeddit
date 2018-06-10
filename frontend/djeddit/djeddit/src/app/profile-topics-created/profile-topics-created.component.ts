import { Component, OnInit } from '@angular/core';
import {TopicService} from "../topic.service";
import {Topic} from "../topic";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-profile-topics-created',
  templateUrl: './profile-topics-created.component.html',
  styleUrls: ['./profile-topics-created.component.css']
})
export class ProfileTopicsCreatedComponent implements OnInit {

  topics: Topic[];

  constructor(private route: ActivatedRoute,
              private topicService: TopicService,
              private titleService: Title) { }

  ngOnInit() {
    this.getTopics(this.route.snapshot.paramMap.get("username"));
    this.titleService.setTitle(this.route.snapshot.paramMap.get("username") + ": Topics Created");
  }

  getTopics(username: string): void {
    this.topicService.getUserTopicsCreated(username).subscribe(topics => {this.topics = topics;});
  }

}
