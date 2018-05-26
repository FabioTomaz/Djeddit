import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../post';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.css']
})
export class PostPreviewComponent implements OnInit {
  @Input() post: Post;

  constructor() { }

  ngOnInit() {
  }

  orderByDate(post: Post[]): Post[] {
    return post.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

}
