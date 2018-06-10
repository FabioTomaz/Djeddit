import { Component, OnInit } from '@angular/core';
import {Topic} from '../topic';
import {PostService} from '../post.service';
import {Post} from '../post';
import {TopicService} from '../topic.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {AuthenticationService} from '../authentication.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-topic-page',
  templateUrl: './topic-page.component.html',
  styleUrls: ['./topic-page.component.css']
})
export class TopicPageComponent implements OnInit {

  topic: Topic;
  posts: Post[];
  isUserLogged: boolean;
  isUserSubs: boolean;

  constructor(
    private postService: PostService,
    private topicService: TopicService,
    private route: ActivatedRoute,
    private titleService: Title,
    private authService: AuthenticationService,
    private location: Location) { }

  ngOnInit() {
    this.isUserSubs = false;
    this.isUserLogged = this.authService.userLoggedIn();
    this.getTopic();
    this.getPosts();
    this.titleService.setTitle(this.route.snapshot.paramMap.get("topic_name") + " Topic Page");
    if (this.isUserLogged) {
      this.isUserSubs = this.checkIfSubscribed();
    }
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

  subscribeTopic() {
    let subs: string;
    //if user is subscribed, unsubscribe and vice versa
    if (this.isUserSubs) {
      subs = JSON.stringify({ topic_name: this.topic.name, voter: this.authService.getLoggedProfile().user.id,
        state: 'unsubs' });
    } else {
      subs = JSON.stringify({ topic_name: this.topic.name, voter: this.authService.getLoggedProfile().user.id,
        state: 'subs' });
    }
    this.topicService.subscribeTopic(subs).subscribe(data => {
      console.log(JSON.stringify(data));
      if (this.isUserSubs) {
        this.isUserSubs = false;
      } else {
        this.isUserSubs = true;
      }
    }, (err) => {
      console.log(err);
    });
  }


  checkIfSubscribed(): boolean {
    const userSubs = this.authService.getLoggedProfile().subscriptions;
    for (let i = 0; i < userSubs.length ; i++) {
      if ( userSubs[i] === this.topic.name) {
        return true;
      }
    }
    return false;
  }

  checkIfItIsCreator(): boolean{
    if (!this.isUserLogged) {
      return false;
    } else {
      if (this.topic.userCreator === this.authService.getLoggedProfile().user) {
        return true;
      }
      return false;
    }
  }

}
