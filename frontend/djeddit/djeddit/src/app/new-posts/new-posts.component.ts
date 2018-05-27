import { Component, OnInit } from '@angular/core';
import {Post} from '../post';
import {PostService} from '../post.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-new-posts',
  templateUrl: './new-posts.component.html',
  styleUrls: ['./new-posts.component.css']
})
export class NewPostsComponent implements OnInit {

  posts: Post[];

  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    if (this.route.snapshot.data['order'] == 'new')
      this.postService.getPostsByDateOrder().subscribe(posts => {this.posts = posts;});
    else if (this.route.snapshot.data['order'] == 'top_rated')
      this.postService.getPostsByTopRatedOrder().subscribe(posts => {this.posts = posts;});
    else if (this.route.snapshot.data['order'] == 'most_viewed')
      this.postService.getPostsByMostViewedOrder().subscribe(posts => {this.posts = posts;});
    else if (this.route.snapshot.data['order'] == 'controversial')
      this.postService.getPostsByControversialOrder().subscribe(posts => {this.posts = posts;});
    else
      this.postService.getPosts().subscribe(posts => {this.posts = posts;});
  }

}
