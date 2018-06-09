import { Component, OnInit } from '@angular/core';
import {Topic} from '../topic';
import {TopicService} from '../topic.service';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../post.service';
import {Post} from '../post';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms'
import {AuthenticationService} from '../authentication.service';

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
              private route: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.getTopic();
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      //tried to add here a Validator.maxLength .. but the form is never valid. Instead, i defined
      //that validot in the field
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
      console.log(data);
      // this.router.navigate(['login']);
    }, );
  }


}
