import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-post-creation-status',
  templateUrl: './post-creation-status.component.html',
  styleUrls: ['./post-creation-status.component.css']
})
export class PostCreationStatusComponent implements OnInit {
  topic_name: string;
  success: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    if (this.route.snapshot.queryParams['success'] === 'false'){
      this.success = false;
    } else {
      this.success = true;
    }
    this.topic_name = this.route.snapshot.paramMap.get('topic_name');
  }

}
