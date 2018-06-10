import { Component, OnInit } from '@angular/core';
import {TopicService} from '../topic.service';
import {Topic} from '../topic';
import {Post} from '../post';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../authentication.service';
import {ActivatedRoute, Route, Router} from '@angular/router';

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.css']
})
export class CreateTopicComponent implements OnInit {

  topic: Topic;
  topicForm: FormGroup;
  isUserLogged: boolean;

  constructor(private topicService: TopicService,
              private authService: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.topic = new Topic();
    this.isUserLogged = false;
    this.isUserLogged = this.authService.userLoggedIn();
    this.createForm();
  }
  createForm() {
    this.topicForm = this.fb.group({
      // tried to add here a Validator.maxLength .. but the form is never valid. Instead, i defined
      // that validation in the field
      name: ['', Validators.required],
      descr: ['', Validators.required ],
      rules: ['', Validators.required ]
    });
  }

  createTopic() {
    this.topic.userCreator = this.authService.getLoggedProfile().user;
    this.topicService.createTopic(this.topic).subscribe(data => {
      // console.log(JSON.stringify(data));
      if (data) {
        this.router.navigate(['topic_create_status'], { queryParams: { topic: data.name } } );
      }
    }, (err) => {
      console.log(err);
      this.router.navigate(['topic_create_status'], { queryParams: { topic: '' } } );
    });
  }

}
