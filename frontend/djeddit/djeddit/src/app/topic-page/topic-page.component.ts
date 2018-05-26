import { Component, OnInit } from '@angular/core';
import {Topic} from '../topic';
import {PostService} from '../post.service';
import {Post} from '../post';
import {TopicService} from '../topic.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-topic-page',
  templateUrl: './topic-page.component.html',
  styleUrls: ['./topic-page.component.css']
})
export class TopicPageComponent implements OnInit {

  topic: Topic;
  posts: Post[];

  constructor(
    private postService: PostService,
    private topicService: TopicService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getTopic();
    this.getPosts();
  }

  getTopic(): void {
    const topic_name: string = this.route.snapshot.paramMap.get('topic_name');
    this.topicService.getTopic(topic_name).subscribe(topic => {this.topic = topic; });
  }

  getPosts(): void {
    const topic_name: string = this.route.snapshot.paramMap.get('topic_name');
    this.postService.getPosts().subscribe(posts => {this.posts = posts.filter(pos => pos.topic.name === topic_name); });
  }

  orderByDate(post: Post[]): Post[] {
    return post.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

}
