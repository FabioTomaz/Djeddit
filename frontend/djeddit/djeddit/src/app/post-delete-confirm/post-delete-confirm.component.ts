import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-delete-confirm',
  templateUrl: './post-delete-confirm.component.html',
  styleUrls: ['./post-delete-confirm.component.css']
})
export class PostDeleteConfirmComponent implements OnInit {

  topic_name: string;
  post_id: number;

  constructor() { }

  ngOnInit() {
  }

}
