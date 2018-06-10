import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Post} from '../post';
import {Report} from '../report';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {TopicService} from '../topic.service';
import {PostService} from '../post.service';
import {AuthenticationService} from '../authentication.service';
import {ReportService} from '../report.service';

@Component({
  selector: 'app-report-post',
  templateUrl: './report-post.component.html',
  styleUrls: ['./report-post.component.css']
})
export class ReportPostComponent implements OnInit {
  reportForm: FormGroup;
  report: Report;
  post: Post;
  isUserLogged: boolean;
  constructor(private fb: FormBuilder,
              private routeActive: ActivatedRoute,
              private reportService: ReportService,
              private authService: AuthenticationService,
              private route: Router,
              private postService: PostService) { }

  ngOnInit() {
    this.post = new Post();
    this.isUserLogged = false;
    this.isUserLogged = this.authService.userLoggedIn();
    this.createForm();
    this.report = new Report();
    this.getPost();
  }

  createForm() {
    this.reportForm = this.fb.group({
      reportText: ['', Validators.required]
    });
  }

  getPost(): void {
    const post_id: string = this.routeActive.snapshot.paramMap.get('post_id');
    this.postService.getPost(+post_id).subscribe(post => {this.post = post; });
  }

  sendReport() {
    this.report.post = this.post;
    this.report.user = this.authService.getLoggedProfile().user.id;
    this.reportService.sendReport(this.report).subscribe(data => {
      // console.log(JSON.stringify(data));

      this.route.navigate(['topic/' + this.post.topic.name + '/post/' + this.post.id + '/report_status'],
        { queryParams: { success: 'true' } } );

    }, (err) => {
      console.log(err);
      this.route.navigate(['topic/' + this.post.topic.name + '/post/' + this.post.id + '/report_status'],
        { queryParams: { success: 'false' } } );
    });
  }

}
