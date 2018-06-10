import { Component, OnInit } from '@angular/core';
import {Post} from "../post";
import {PostService} from "../post.service";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-profile-posts-created',
  templateUrl: './profile-posts-created.component.html',
  styleUrls: ['./profile-posts-created.component.css']
})
export class ProfilePostsCreatedComponent implements OnInit {

  posts: Post[];

  constructor(private route: ActivatedRoute,
              private postService: PostService,
              private titleService: Title) { }

  ngOnInit() {
    this.getPosts(this.route.snapshot.paramMap.get("username"));
    this.titleService.setTitle(this.route.snapshot.paramMap.get("username") + ": Posts");
  }

  getPosts(username: string): void {
    this.postService.getUserPosts(username).subscribe(posts => {this.posts = posts;});
  }

}
