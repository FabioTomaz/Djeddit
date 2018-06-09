import {Component, Inject, OnInit} from '@angular/core';
import {PostService} from '../post.service';
import {Post} from '../post';
import {ActivatedRoute} from '@angular/router';
import {CommentService} from '../comment.service';
import {Comment} from '../comment';
import {ProfileService} from '../profile.service';
import {Profile} from '../profile';
import {DOCUMENT} from '@angular/common';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css', '../../jquery.upvote.css']
})
export class PostPageComponent implements OnInit {

  post: Post;
  comments: Comment[];
  profiles: Profile[];
  score: number;
  upClass: string;
  downClass: string;

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    @Inject(DOCUMENT) document) { }

  ngOnInit() {
    this.getPostAndComments();
  }

  getPostAndComments(): void {
    const post_id: number = +this.route.snapshot.paramMap.get('post_id');
    this.upClass = 'upvote';
    this.downClass = 'downvote';
    this.postService.getPost(post_id).subscribe(post => {
      this.post = post;
      if (this.authService.userLoggedIn()) {
        const user_id = this.authService.getLoggedProfile().user.id;
        for (let i = 0; i < this.post.userUpVotesPost.length; i++) {
            if (this.post.userUpVotesPost[i] === user_id) {
              this.upClass = 'upvote upvote-on';
            }
        }
        for (let i = 0; i < this.post.userDownVotesPost.length; i++) {
          if (this.post.userDownVotesPost[i] === user_id) {
            this.downClass = 'downvote downvote-on';
          }
        }
      }
      this.score = this.getPostScore(post);
      this.commentService.getCommentsInPost(post_id).subscribe(comments => {this.comments = comments;
        for (let i = 0; i < this.comments.length; i++) {
          this.getProfile(comments[i].user.username, +i);
        }
      });

    });

  }

  getPostScore(post: Post): number {
    return post.userUpVotesPost.length - post.userDownVotesPost.length;
  }

  getProfile(username: string, i: number) {
    this.profileService.getProfileByUsername(username).subscribe(profile => {
      profile.user_picture = 'http://127.0.0.1:8000' + profile.user_picture;
      this.profiles[i] = profile;
      console.log(this.profiles[i].user_picture);
    });
  }

  upvote_post(post_id: number) {
    if (this.upClass === 'upvote upvote-on') { // if user has previously upvoted, remove upvote
      this.upClass = 'upvote';
      this.score--;   // -1 upvote
    } else {
      this.upClass = 'upvote upvote-on';
      this.score++;
      if (this.downClass === 'downvote downvote-on') { // remove downvote, and upvote
        this.downClass = 'downvote';
        this.score++;
      }

    }
    // send request with post score increment
  }

  downvote_post(post_id: number) {
    const upbtn = document.getElementById('upvote_post');
    const downbtn = document.getElementById('downvote_post');

    if (this.downClass === 'downvote downvote-on') { // remove downvote
      this.downClass = 'downvote';
      this.score++;
    } else {
      this.downClass = ('downvote downvote-on');
      this.score--;
      if (this.upClass === 'upvote upvote-on') { // remove upvote, and downvote
        this.upClass = ('upvote');
        this.score--;
      }
    }
    // send request to downvote post
  }

}
