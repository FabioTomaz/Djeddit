import { Component, OnInit } from '@angular/core';
import {CommentService} from "../comment.service";
import {ActivatedRoute} from "@angular/router";
import {Comment} from "../comment";

@Component({
  selector: 'app-profile-comments-downvoted',
  templateUrl: './profile-comments-downvoted.component.html',
  styleUrls: ['./profile-comments-downvoted.component.css']
})
export class ProfileCommentsDownvotedComponent implements OnInit {

  list: Comment[];

  constructor(private service: CommentService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getComments(this.route.snapshot.paramMap.get("username"));
  }

  getComments(username: string): void{
    this.service.getUserCommentsDownvoted(username).subscribe(comments => this.list = comments);
  }

}
