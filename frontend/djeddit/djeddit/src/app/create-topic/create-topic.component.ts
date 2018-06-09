import { Component, OnInit } from '@angular/core';
import {TopicService} from '../topic.service';
import {Topic} from '../topic';
import {Post} from '../post';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.css']
})
export class CreateTopicComponent implements OnInit {

  topic: Topic;
  topicForm: FormGroup;

  constructor(private topicService: TopicService,
              private authService: AuthenticationService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.topic = new Topic();
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
      console.log(data);
      // this.router.navigate(['login']);
    }, );
  }

}
