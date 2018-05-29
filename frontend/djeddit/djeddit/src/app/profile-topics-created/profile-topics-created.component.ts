import { Component, OnInit } from '@angular/core';
import {TopicService} from "../topic.service";
import {Topic} from "../topic";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile-topics-created',
  templateUrl: './profile-topics-created.component.html',
  styleUrls: ['./profile-topics-created.component.css']
})
export class ProfileTopicsCreatedComponent implements OnInit {

  topics: Topic[];

  constructor(private route: ActivatedRoute, private topicService: TopicService) { }

  ngOnInit() {
    this.getTopics(this.route.snapshot.paramMap.get("username"));
  }

  getTopics(username: string): void {
    this.topicService.getUserTopicsCreated(username).subscribe(topics => {this.topics = topics;});
  }

}
