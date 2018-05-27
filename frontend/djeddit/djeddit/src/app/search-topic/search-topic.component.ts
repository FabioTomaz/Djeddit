import {Component, Input, OnInit} from '@angular/core';
import {Topic} from "../topic";
import {TopicService} from "../topic.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-search-topic',
  templateUrl: './search-topic.component.html',
  styleUrls: ['./search-topic.component.css']
})
export class SearchTopicComponent implements OnInit {
  topics: Topic[];
  q: string;
  constructor(private topicService: TopicService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.q = this.activatedRoute.snapshot.queryParams["q"];
    this.topicService.searchTopicsByName(this.q).subscribe(topics => {this.topics = topics;});
  }

}
