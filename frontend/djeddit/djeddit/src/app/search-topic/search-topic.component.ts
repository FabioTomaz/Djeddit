import {Component, Input, OnInit} from '@angular/core';
import {Topic} from '../topic';
import {TopicService} from '../topic.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-search-topic',
  templateUrl: './search-topic.component.html',
  styleUrls: ['./search-topic.component.css']
})
export class SearchTopicComponent implements OnInit {
  topics: Topic[];
  q: string;
  user_creator: string;
  orderby: string;
  constructor(private topicService: TopicService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.q = this.activatedRoute.snapshot.queryParams['q'];
    this.orderby = this.activatedRoute.snapshot.queryParams['orderby'];
    this.user_creator = this.activatedRoute.snapshot.queryParams['user_creator'];

    if (this.user_creator == null) {
      this.user_creator = '';
    }
    if (this.orderby == null) {
      this.orderby = 'Alphabetical order';
    }

    this.topicService.searchTopics(this.q, this.user_creator, this.orderby).subscribe(topics => {this.topics = topics; });
  }

  searchTopics(query: string, creatorQ: string, orderQ: string ) {
    this.router.navigate(['/search/topic'], { queryParams: { q: query,
        user_creator: creatorQ, orderby: orderQ}});
    // page does not reload on its own
    location.reload();
  }
}
