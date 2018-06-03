import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../profile.service';
import {TopicService} from '../topic.service';
import {PostService} from '../post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {AuthenticationService} from "../authentication.service";
import {User} from "../user";
import {Profile} from "../profile";

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit {

  selectedFilter: string;
  loggedUser: User = null;
  createdProfile: Profile;
  returnUrl: string;

  // Login form
  loading : boolean = false;


  constructor(private profileService: ProfileService,
              private topicService: TopicService,
              private postService: PostService,
              private authService: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) { }

  ngOnInit() {
    // set default selection
    this.selectedFilter = 'topic';

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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

  onSubmit(): void{
    this.login();
  }

  login() {
    this.loading = true;
    this.authService.login(this.loggedUser.username, this.loggedUser.password)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          //this.alertService.error(error);
          this.loading = false;
        });
  }

  register() {
    this.loading = true;
    this.profileService.create(this.createdProfile)
      .subscribe(
        data => {
          //this.alertService.success('Registration successful', true);
          this.router.navigate(['login']);
        },
        error => {
          //this.alertService.error(error);
          this.loading = false;
        });
  }

  //reference: https://stackoverflow.com/questions/44864303/send-data-through-routing-paths-in-angular

}
