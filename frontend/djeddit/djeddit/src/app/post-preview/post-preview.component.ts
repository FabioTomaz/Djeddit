import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../post';
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.css']
})
export class PostPreviewComponent implements OnInit {
  @Input() post: Post;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  checkAuth(): boolean {
    console.log(this.authService.userLoggedIn());
    return this.authService.userLoggedIn();
  }

  checkLoggedUserIsOP(): boolean{
    if(this.checkAuth())
      return this.authService.getLoggedProfile().user.username === this.post.userOP.username;
    return false;
  }

  checkUserSaved(): boolean{
    if(this.checkAuth())
      return this.post.userSaved.includes(this.authService.getLoggedProfile().user.id);
    return false;
  }

  checkUserHidden(): boolean{
    if(this.checkAuth())
      return this.post.userHidden.includes(this.authService.getLoggedProfile().user.id);
    return false;
  }

  unsavePost() {

  }

  savePost() {

  }

  hidePost() {

  }

  showPost() {

  }
}
