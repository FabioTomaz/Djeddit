import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-topic-creation-status',
  templateUrl: './topic-creation-status.component.html',
  styleUrls: ['./topic-creation-status.component.css']
})
export class TopicCreationStatusComponent implements OnInit {

  topic_name: string;
  success: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.topic_name = this.route.snapshot.queryParams['topic'];
    if (this.topic_name === '') {
      this.success = false;
    } else {
      this.success = true;
    }
    // this.topic_name = this.route.snapshot.paramMap.get('topic_name');
  }
}
