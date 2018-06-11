import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';

@Component({
  selector: 'app-report-post-confirmation',
  templateUrl: './report-post-confirmation.component.html',
  styleUrls: ['./report-post-confirmation.component.css']
})
export class ReportPostConfirmationComponent implements OnInit {
  topic_name: string;
  post_id: number;
  success: boolean;
  constructor(private routeActive: ActivatedRoute) { }

  ngOnInit() {
    this.topic_name = this.routeActive.snapshot.paramMap.get('topic_name');
    this.post_id = +this.routeActive.snapshot.paramMap.get('post_id');
    this.success = this.routeActive.snapshot.queryParams['success'];
  }

}
