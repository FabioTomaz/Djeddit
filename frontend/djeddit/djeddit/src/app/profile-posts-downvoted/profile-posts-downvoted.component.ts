import { Component, OnInit } from '@angular/core';
import {Post} from "../post";
import {PostService} from "../post.service";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-profile-posts-downvoted',
  templateUrl: './profile-posts-downvoted.component.html',
  styleUrls: ['./profile-posts-downvoted.component.css']
})
export class ProfilePostsDownvotedComponent implements OnInit {

  posts: Post[];

  constructor(private route: ActivatedRoute,
              private postService: PostService,
              private titleService: Title) { }

  ngOnInit() {
    this.getPosts(this.route.snapshot.paramMap.get("username"));
    this.titleService.setTitle(this.route.snapshot.paramMap.get("username") + ": Posts Downvoted");
  }

  getPosts(username: string): void {
    this.postService.getUserPostsDownvoted(username).subscribe(posts => {this.posts = posts;});
  }

}
