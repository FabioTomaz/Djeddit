import { Component, OnInit } from '@angular/core';
import {CommentService} from "../comment.service";
import {ActivatedRoute} from "@angular/router";
import {Comment} from "../comment";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-profile-comments-downvoted',
  templateUrl: './profile-comments-downvoted.component.html',
  styleUrls: ['./profile-comments-downvoted.component.css']
})
export class ProfileCommentsDownvotedComponent implements OnInit {

  list: Comment[];

  constructor(private service: CommentService,
              private route: ActivatedRoute,
              private titleService: Title) { }

  ngOnInit() {
    this.getComments(this.route.snapshot.paramMap.get("username"));
    this.titleService.setTitle(this.route.snapshot.paramMap.get("username") + ": Comments Downvoted");
  }

  getComments(username: string): void{
    this.service.getUserCommentsDownvoted(username).subscribe(comments => this.list = comments);
  }

}
