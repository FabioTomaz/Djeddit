import { Component, OnInit } from '@angular/core';
import {CommentService} from "../comment.service";
import {ActivatedRoute} from "@angular/router";
import {Comment} from "../comment";

@Component({
  selector: 'app-profile-comments',
  templateUrl: './profile-comments.component.html',
  styleUrls: ['./profile-comments.component.css']
})
export class ProfileCommentsComponent implements OnInit {
  list: Comment[];

  constructor(private service: CommentService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getComments(this.route.snapshot.paramMap.get("username"));
  }

  getComments(username: string): void{
    this.service.getUserComments(username).subscribe(comments => this.list = comments);
  }

}
