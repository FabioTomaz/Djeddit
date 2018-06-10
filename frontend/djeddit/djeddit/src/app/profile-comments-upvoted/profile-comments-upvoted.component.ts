import { Component, OnInit } from '@angular/core';
import {CommentService} from "../comment.service";
import {ActivatedRoute} from "@angular/router";
import {Comment} from "../comment";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-profile-comments-upvoted',
  templateUrl: './profile-comments-upvoted.component.html',
  styleUrls: ['./profile-comments-upvoted.component.css']
})
export class ProfileCommentsUpvotedComponent implements OnInit {

  list: Comment[];

  constructor(private service: CommentService,
              private route: ActivatedRoute,
              private titleService: Title) { }

  ngOnInit() {
    this.getComments(this.route.snapshot.paramMap.get("username"));
    this.titleService.setTitle(this.route.snapshot.paramMap.get("username") + ": Comments Upvoted");
  }

  getComments(username: string): void{
    this.service.getUserCommentsUpvoted(username).subscribe(comments => this.list = comments);
  }
}
