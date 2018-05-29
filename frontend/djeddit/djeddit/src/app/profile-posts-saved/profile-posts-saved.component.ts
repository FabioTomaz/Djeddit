import { Component, OnInit } from '@angular/core';
import {Post} from "../post";
import {PostService} from "../post.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile-posts-saved',
  templateUrl: './profile-posts-saved.component.html',
  styleUrls: ['./profile-posts-saved.component.css']
})
export class ProfilePostsSavedComponent implements OnInit {

  posts: Post[];

  constructor(private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit() {
    this.getPosts(this.route.snapshot.paramMap.get("username"));
  }

  getPosts(username: string): void {
    this.postService.getUserPostsSaved(username).subscribe(posts => {this.posts = posts;});
  }

}
