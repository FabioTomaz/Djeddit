import { Component, OnInit } from '@angular/core';
import {Post} from '../post';
import {PostService} from '../post.service';

@Component({
  selector: 'app-new-posts',
  templateUrl: './new-posts.component.html',
  styleUrls: ['./new-posts.component.css']
})
export class NewPostsComponent implements OnInit {

  posts: Post[];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getPosts().subscribe(posts => {this.posts = posts;});
  }

  orderByDate(p: Post[]): Post[] {
    return p.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

}
