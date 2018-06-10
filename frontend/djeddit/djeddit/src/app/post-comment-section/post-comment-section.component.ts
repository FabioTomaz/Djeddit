import {AfterContentInit, Component, ElementRef, Inject, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {PostService} from '../post.service';
import {Comment} from '../comment';
import {Post} from '../post';
import {ActivatedRoute} from '@angular/router';
import {CommentService} from '../comment.service';
import {Profile} from '../profile';
import {DOCUMENT} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-post-comment-section',
  templateUrl: './post-comment-section.component.html',
  styleUrls: ['./post-comment-section.component.css', '../../comments.css', '../../jquery.upvote.css']
})
export class PostCommentSectionComponent implements OnInit, OnChanges {

  @Input() comments: Comment[];
  @Input() post: Post;
  @Input() profiles: Profile[];
  urlBase: String;
  private replyBox: any;
  replyForm: FormGroup;
  reply: Comment;
  isUserLogged: boolean;
  loggedUser: Profile;
  votes: Map<string, string>;
  scores: Map<number, number>;

  constructor(@Inject(DOCUMENT) document,
              private fb: FormBuilder,
              private commentService: CommentService,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.urlBase = 'http://127.0.0.1:8000';
    this.reply = new Comment();
    this.votes = new Map();
    this.scores = new Map();
    this.createForm();
    if (this.isUserLogged) {
      this.loggedUser = this.authService.getLoggedProfile();
    }
  }

  ngOnChanges() {
    this.isUserLogged = this.authService.userLoggedIn();
    if (this.isUserLogged) {
      this.loggedUser = this.authService.getLoggedProfile();
    }
    this.place_votes();
  }

  createForm() {
    this.replyForm = this.fb.group({
      replyText: ['', Validators.required]
    });
    this.post = new Post();
  }

  /*getComments(): void {
    const id: number = +this.post.id;
    this.commentService.getCommentsInPost(id).subscribe(comments => {this.comments = comments; });
  }*/

  getCommentScore(comment: Comment): number {
    return comment.userUpVotesComments.length - comment.userDownVotesComments.length;
  }

  // given a comment, returns all replies to that comment
  // a reply has a number which represents the comment to which is replying.
  getCommentReplies(comment: Comment): Comment[] {
    const c: Comment[] = [];
    let i = 0;
    for (i; i < this.comments.length; i++) {
      if (this.comments[i].reply === comment.id) {
        c.push(this.comments[i]);
      }
    }
    return c;
  }

  open_close_reply_area(nComment: number) {
    this.replyBox = document.getElementById('add_reply_' + nComment);
    if (this.replyBox.style.display === 'none') {
      this.replyBox.style.display = 'block';
    } else {
      this.replyBox.style.display = 'none';
    }
  }

  sendReply(commentID: number) {
    console.log(this.reply.text);
    this.reply.user = this.authService.getLoggedProfile().user;
    this.reply.post = this.post;
    this.reply.reply = commentID;
    this.commentService.createComment(this.reply).subscribe(data => {
      if (data) {
        location.reload();
      }
    }, (err) => {
      console.log(err);
    });
  }

  upvote_post(commentID: number) {
    if (this.isUserLogged) {
      const down = 'downvote_comment_' + commentID;
      const up = 'upvote_comment_' + commentID;
      let score: number;
      if (this.votes.get(up) === 'btn btn-success') { // remove upvote
        this.votes.set(up, 'btn');
        score = this.scores.get(commentID);
        score--;
        this.scores.set(commentID, score);
      } else {
        this.votes.set(up, 'btn btn-success');
        score = this.scores.get(commentID);
        score++;
        this.scores.set(commentID, score);
        if (this.votes.get(down) === 'btn btn-danger') { // remove downvte, and upvote
          this.votes.set(down, 'btn');
          score = this.scores.get(commentID);
          score++;
          this.scores.set(commentID, score);
        }
      }
      const vote = JSON.stringify({
        comment_id: commentID, voter: this.authService.getLoggedProfile().user.id,
        vote: 'up'
      });
      console.log(vote);
      this.commentService.voteComment(vote).subscribe(data => {
        // console.log(JSON.stringify(data));
        console.log(data);
      }, (err) => {
        console.log(err);
      });
    }
  }

  downvote_post(commentID: number) {
    if (this.isUserLogged) {
      const s = 'downvote_comment_' + commentID;
      const up = 'upvote_comment_' + commentID;
      let score: number;
      if (this.votes.get(s) === 'btn btn-danger') { // remove downvote
        this.votes.set(s, 'btn');
        score = this.scores.get(commentID);
        score++;
        this.scores.set(commentID, score);

      } else {
        this.votes.set(s, 'btn btn-danger');
        score = this.scores.get(commentID);
        score--;
        this.scores.set(commentID, score);
        if (this.votes.get(up) === 'btn btn-success') { // remove upvote, and downvote
          this.votes.set(up, 'btn');
          score = this.scores.get(commentID);
          score--;
          this.scores.set(commentID, score);
        }
      }
      const vote = JSON.stringify({
        comment_id: commentID, voter: this.authService.getLoggedProfile().user.id,
        vote: 'down'
      });
      //console.log(vote);
      this.commentService.voteComment(vote).subscribe(data => {
        // console.log(JSON.stringify(data));
        //console.log(data);
      }, (err) => {
        console.log(err);
      });
    }
  }


  place_votes() {
    //console.log(this.comments.length);
    for (let i = 0; i < this.comments.length; i++) {
      this.votes.set('upvote_comment_' + this.comments[i].id, 'btn');
      this.votes.set('downvote_comment_' + this.comments[i].id, 'btn');
      this.scores.set(this.comments[i].id, this.getCommentScore(this.comments[i]));
      if (this.isUserLogged) {
        //if there are upvotes, mark the button in the correspondent comment as upvoted by this user
        for (let j = 0; j < this.comments[i].userUpVotesComments.length; j++) {
          if (this.loggedUser.user.id === this.comments[i].userUpVotesComments[j]) {
            this.votes.set('upvote_comment_' + this.comments[i].id, 'btn btn-success');
          }
        }
        //same fot downvotes
        for (let j = 0; j < this.comments[i].userDownVotesComments.length; j++) {
          if (this.loggedUser.user.id === this.comments[i].userDownVotesComments[j]) {
            this.votes.set('downvote_comment_' + this.comments[i].id, 'btn btn-danger');
          }
        }
      }
    }
  }
}
