import { Component, OnInit } from '@angular/core';
import {Post} from "../post";
import {PostService} from "../post.service";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-profile-posts-hidden',
  templateUrl: './profile-posts-hidden.component.html',
  styleUrls: ['./profile-posts-hidden.component.css']
})
export class ProfilePostsHiddenComponent implements OnInit {

  posts: Post[];

  constructor(private route: ActivatedRoute,
              private postService: PostService,
              private titleService: Title) { }

  ngOnInit() {
    this.getPosts(this.route.snapshot.paramMap.get("username"));
    this.titleService.setTitle(this.route.snapshot.paramMap.get("username") + ": Posts Hidden");
  }

  getPosts(username: string): void {
    this.postService.getUserPostsHidden(username).subscribe(posts => {this.posts = posts;});
  }

}
