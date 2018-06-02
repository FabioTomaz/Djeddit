import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../profile.service';
import {TopicService} from '../topic.service';
import {PostService} from '../post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit {

  selectedFilter: string;

  constructor(private profileService: ProfileService,
              private topicService: TopicService,
              private postService: PostService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) { }

  ngOnInit() {
    // set default selection
    this.selectedFilter = 'topic';
  }

  /*search(query: string, filter: string): void {
    if (filter === 'post') {
      this.router.navigate(['new']);
    }*/

  search(query: string): void {
    this.router.navigate(['/search/' + this.selectedFilter], {queryParams: {q: query}});
  }

  // event handler for the select filter
  onOptionsSelected (option: string): void {
    // update the ui
    this.selectedFilter = option;
  }

  //reference: https://stackoverflow.com/questions/44864303/send-data-through-routing-paths-in-angular

}
