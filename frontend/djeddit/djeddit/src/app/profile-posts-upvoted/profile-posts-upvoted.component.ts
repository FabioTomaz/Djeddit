import { Component, OnInit } from '@angular/core';
import {Post} from "../post";
import {PostService} from "../post.service";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-profile-posts-upvoted',
  templateUrl: './profile-posts-upvoted.component.html',
  styleUrls: ['./profile-posts-upvoted.component.css']
})
export class ProfilePostsUpvotedComponent implements OnInit {

  posts: Post[];

  constructor(private route: ActivatedRoute,
              private postService: PostService,
              private titleService: Title) { }

  ngOnInit() {
    this.getPosts(this.route.snapshot.paramMap.get("username"));
    this.titleService.setTitle(this.route.snapshot.paramMap.get("username") + ": Posts Upvoted");
  }

  getPosts(username: string): void {
    this.postService.getUserPostsUpvoted(username).subscribe(posts => {this.posts = posts;});
  }

}
