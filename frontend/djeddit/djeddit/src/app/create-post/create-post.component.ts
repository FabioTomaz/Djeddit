import { Component, OnInit } from '@angular/core';
import {Topic} from '../topic';
import {TopicService} from '../topic.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../post.service';
import {Post} from '../post';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import {AuthenticationService} from '../authentication.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  topic: Topic;
  post: Post;
  angForm: FormGroup;

  constructor(private postService: PostService,
              private topicService: TopicService,
              private authService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private titleService: Title) { }

  ngOnInit() {
    this.getTopic();
    this.createForm();
    this.titleService.setTitle("Create Post");
  }

  createForm() {
    this.angForm = this.fb.group({
      title: ['', Validators.required],
      post: ['', Validators.required ]
    });
    this.post = new Post();
  }

  getTopic(): void {
    const topic_name: string = this.route.snapshot.paramMap.get('topic_name');
    this.topicService.getTopic(topic_name).subscribe(topic => {this.topic = topic; });
  }

  createPost(): void {
    this.post.userOP = this.authService.getLoggedProfile().user;
    this.post.topic = this.topic;
    this.postService.createPost(this.post).subscribe(data => {
      console.log('data');
      console.log(data);
      if (data) {
        this.router.navigate(['topic/' + this.topic.name + '/create_post_status'], { queryParams: { success: false } } );
      }
    }, (err) => {
      this.router.navigate(['topic/' + this.topic.name + '/create_post_status'], { queryParams: { success: false } } );
    });
  }


}
