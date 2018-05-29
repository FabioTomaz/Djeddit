import { Component, OnInit } from '@angular/core';
import {CommentService} from "../comment.service";

@Component({
  selector: 'app-profile-comments',
  templateUrl: './profile-comments.component.html',
  styleUrls: ['./profile-comments.component.css']
})
export class ProfileCommentsComponent implements OnInit {
  list: Comment[];

  constructor(private service: CommentService) { }

  ngOnInit() {

  }

}
