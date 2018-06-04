import { Component, OnInit } from '@angular/core';
import {PostService} from '../post.service';
import {Post} from '../post';
import {ActivatedRoute} from '@angular/router';
import {CommentService} from '../comment.service';
import {Comment} from '../comment';
import {ProfileService} from '../profile.service';
import {Profile} from '../profile';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {

  post: Post;
  comments: Comment[];
  profiles: Profile[];

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private profileService: ProfileService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getPostAndComments();
  }

  getPostAndComments(): void {
    const post_id: number = +this.route.snapshot.paramMap.get('post_id');
    this.postService.getPost(post_id).subscribe(post => {
      this.post = post;
      this.commentService.getCommentsInPost(post_id).subscribe(comments => {this.comments = comments;
        for (let i = 0; i < this.comments.length; i++) {
          this.getProfile(comments[i].user.username, i);
        }
      });

    });

  }

  getPostScore(post: Post): number {
    return post.userUpVotesPost.length - post.userDownVotesPost.length;
  }

  getProfile(username: string, i: number) {
    this.profileService.getProfileByUsername(username).subscribe(profile => {
      profile.user_picture = "http://127.0.0.1:8000" + profile.user_picture;
      this.profiles[i] = profile;
      console.log(this.profiles[i].user_picture);
    });
  }

  /*getCommentScore(comment: Comment): number {
    return comment.userUpVotesComments.length - comment.userDownVotesComments.length;
  }

  // given a comment, returns all replies to that comment
  // a reply has a number which represents the comment to which is replying.
  getCommentReplies(comment: Comment): Comment[] {
    const c: Comment[] = [];
    let i = 0;

      for (i ; i < this.comments.length; i++) {
        if (this.comments[i].reply === comment.id) {
          c.push(this.comments[i]);
        }
      }
    return c;
  }*/

}
