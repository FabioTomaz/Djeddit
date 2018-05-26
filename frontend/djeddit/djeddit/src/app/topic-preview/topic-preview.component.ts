import {Component, Input, OnInit} from '@angular/core';
import {Topic} from "../topic";

@Component({
  selector: 'app-topic-preview',
  templateUrl: './topic-preview.component.html',
  styleUrls: ['./topic-preview.component.css']
})
export class TopicPreviewComponent implements OnInit {
  @Input topic: Topic;

  constructor() { }

  ngOnInit() {
  }

}
