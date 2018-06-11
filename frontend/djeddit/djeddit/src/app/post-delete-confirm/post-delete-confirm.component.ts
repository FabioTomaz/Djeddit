import { Component, OnInit } from '@angular/core';
import {PostService} from '../post.service';
import {ActivatedRoute, Route, Router} from '@angular/router';

@Component({
  selector: 'app-post-delete-confirm',
  templateUrl: './post-delete-confirm.component.html',
  styleUrls: ['./post-delete-confirm.component.css']
})
export class PostDeleteConfirmComponent implements OnInit {

  topic_name: string;
  post_id: number;

  constructor(private postService: PostService,
              private routeAct: ActivatedRoute,
              private route: Router) { }

  ngOnInit() {
    this.topic_name = this.routeAct.snapshot.paramMap.get('topic_name');
    this.post_id = +this.routeAct.snapshot.paramMap.get('post_id');

  }

  delete() {
    const vote = JSON.stringify({
      id: this.post_id});
    console.log(vote);
    this.postService.removePost(vote).subscribe(data => {
      // console.log(JSON.stringify(data));
      console.log(data);
      this.route.navigate(['new']);
    }, (err) => {
      console.log(err);
    });
  }

}
