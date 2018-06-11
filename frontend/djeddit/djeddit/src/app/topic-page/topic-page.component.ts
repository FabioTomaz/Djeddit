import { Component, OnInit } from '@angular/core';
import {Topic} from '../topic';
import {PostService} from '../post.service';
import {Post} from '../post';
import {TopicService} from '../topic.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {AuthenticationService} from '../authentication.service';
import {Title} from '@angular/platform-browser';
import {Profile} from '../profile';

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
  isCreator: boolean

  constructor(
    private postService: PostService,
    private topicService: TopicService,
    private route: ActivatedRoute,
    private titleService: Title,
    private authService: AuthenticationService,
    private location: Location) { }

  ngOnInit() {
    this.topic = new Topic();
    this.isUserSubs = false;
    this.isUserLogged = this.authService.userLoggedIn();
    this.getTopic();
    this.getPosts();
    this.titleService.setTitle(this.route.snapshot.paramMap.get('topic_name') + ' Topic Page');
  }

  getTopic(): void {
    const topic_name: string = this.route.snapshot.paramMap.get('topic_name');
    this.topicService.getTopic(topic_name).subscribe(topic => {this.topic = topic;
      if (this.isUserLogged) {
        this.isUserSubs = this.checkIfSubscribed();
        this.isCreator = this.checkIfItIsCreator();
      }
    });
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
    // if user is subscribed, unsubscribe and vice versa
    if (this.isUserSubs) {
      subs = JSON.stringify({ topic_name: this.topic.name, voter: this.authService.getLoggedProfile().user.id,
        state: 'unsubs' });
    } else {
      subs = JSON.stringify({ topic_name: this.topic.name, voter: this.authService.getLoggedProfile().user.id,
        state: 'subs' });
    }
    this.topicService.subscribeTopic(subs).subscribe(data => {
      console.log(JSON.stringify(data));
      let p: Profile;
      p = this.authService.getLoggedProfile();
      if (this.isUserSubs) { //it was an unsubscribe
        this.isUserSubs = false;
        let s: string[];
        s = [];
        //remove the subs
        for (let i = 0; i < p.subscriptions.length; i++) {
          if (p.subscriptions[i] !== this.topic.name) {
            s.push(p.subscriptions[i]);
          }
        }
        p.subscriptions = s;
        this.authService.updateLoggedProfile(p);

      } else {  //it was a subscribe
        this.isUserSubs = true;
        p.subscriptions.push(this.topic.name);//add another subs to the logged user
        this.authService.updateLoggedProfile(p);

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

  checkIfItIsCreator(): boolean {
      if (this.topic.userCreator.id === this.authService.getLoggedProfile().user.id) {
        return true;
      }
      console.log(this.topic.userCreator.id === this.authService.getLoggedProfile().user.id)
      return false;
  }

}
