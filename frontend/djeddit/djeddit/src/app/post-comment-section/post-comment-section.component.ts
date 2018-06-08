import {Component, ElementRef, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {PostService} from '../post.service';
import {Comment} from '../comment';
import {Post} from '../post';
import {ActivatedRoute} from '@angular/router';
import {CommentService} from '../comment.service';
import {Profile} from '../profile';
import {DOCUMENT} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-post-comment-section',
  templateUrl: './post-comment-section.component.html',
  styleUrls: ['./post-comment-section.component.css', '../../comments.css', '../../jquery.upvote.css']
})
export class PostCommentSectionComponent implements OnInit {

  @Input()comments: Comment[];
  @Input()post: Post;
  @Input()profiles: Profile[];
  urlBase: String;
  private replyBox: any;
  replyForm: FormGroup;
  reply: Comment;

  constructor(@Inject(DOCUMENT) document, private fb: FormBuilder) { }

  ngOnInit() {
    this.urlBase = 'http://127.0.0.1:8000';
    this.createForm();
    this.reply = new Comment();
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
    for (i ; i < this.comments.length; i++) {
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

}
