import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Post} from '../post';
import {Report} from '../report';
import {ActivatedRoute} from '@angular/router';
import {TopicService} from '../topic.service';
import {PostService} from '../post.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-report-post',
  templateUrl: './report-post.component.html',
  styleUrls: ['./report-post.component.css']
})
export class ReportPostComponent implements OnInit {
  reportForm: FormGroup;
  report: Report;
  post: Post;
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private postService: PostService,
              private titleService: Title) { }

  ngOnInit() {
    this.createForm();
    this.report = new Report();
  }

  createForm() {
    this.reportForm = this.fb.group({
      reportText: ['', Validators.required]
    });
  }

  getTopic(): void {
    const post_id: string = this.route.snapshot.paramMap.get('post_id');
    this.postService.getPost(+post_id).subscribe(post => {
      this.post = post;
      this.titleService.setTitle("Report Post: " + this.post.title);
    });
  }

}
