import { Component, OnInit } from '@angular/core';
import {PostService} from '../post.service';
import {Post} from '../post';
import {ActivatedRoute} from '@angular/router';
import {CommentService} from '../comment.service';
import {Comment} from '../comment';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {

  post: Post;
  comments: Comment[];

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getPost();
    this.getCommentsForPost();
    this.getCommentsForPost();
  }

  getPost(): void {
    const post_id: number = +this.route.snapshot.paramMap.get('post_id');
    this.postService.getPost(post_id).subscribe(post => {this.post = post; });
    console.log(this.post.title);
  }

  getPostScore(post: Post): number {
    return post.userUpVotesPost.length - post.userDownVotesPost.length;
  }

  getCommentsForPost(): void {
    const post_id: number = +this.route.snapshot.paramMap.get('post_id');
    this.commentService.getComments(post_id).subscribe(comments => {this.comments = comments; });
  }

}
