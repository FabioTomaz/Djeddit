import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../profile.service';
import {TopicService} from '../topic.service';
import {PostService} from '../post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {AuthenticationService} from "../authentication.service";
import {Profile} from "../profile";

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit {

  selectedFilter: string;
  userIsLoggedIn: boolean ;
  loginProfile: Profile;
  createdProfile: Profile;
  returnUrl: string;

  // Login form
  loading : boolean = false;
  showPassword : boolean = false;

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
    this.userIsLoggedIn = this.checkAuth();
    this.createdProfile = new Profile();
    if(this.userIsLoggedIn){
      this.loginProfile = this.authService.getLoggedProfile();
    }else{
      this.loginProfile = new Profile();
    }
  }

  search(query: string): void {
    this.router.navigate(['/search/' + this.selectedFilter], {queryParams: {q: query}});
  }

  // event handler for the select filter
  onOptionsSelected (option: string): void {
    // update the ui
    this.selectedFilter = option;
  }

  login() {
    this.loading = true;
    this.authService.login(this.loginProfile)
      .subscribe(profile => {
        // login successful if there's a jwt token in the response
        if (profile) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(profile));
          this.loading = false;
          location.reload();
        } else {
          this.loading = false;
        }

        return profile;
      });
  }

  logout() {
    this.authService.logout();
    location.reload();
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
          console.log(error);
          //this.alertService.error(error);
          this.loading = false;
        });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  checkAuth(): boolean {
    return this.authService.userLoggedIn();
  }

}
