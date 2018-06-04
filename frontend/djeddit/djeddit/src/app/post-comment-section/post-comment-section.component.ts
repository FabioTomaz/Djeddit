import {Component, Input, OnInit} from '@angular/core';
import {PostService} from '../post.service';
import {Comment} from '../comment';
import {Post} from '../post';
import {ActivatedRoute} from '@angular/router';
import {CommentService} from '../comment.service';
import {Profile} from '../profile';

@Component({
  selector: 'app-post-comment-section',
  templateUrl: './post-comment-section.component.html',
  styleUrls: ['./post-comment-section.component.css', '../../comments.css', '../../jquery.upvote.css']
})
export class PostCommentSectionComponent implements OnInit {

  @Input()comments: Comment[];
  @Input()post: Post;

  constructor() { }

  ngOnInit() {
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

}
