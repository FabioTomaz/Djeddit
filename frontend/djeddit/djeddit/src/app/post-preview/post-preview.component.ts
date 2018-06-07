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
    return this.authService.userLoggedIn();
  }

  checkLoggedUserIsOP(): boolean{
    return this.authService.getLoggedUser().user.username === this.post.userOP.username;
  }

  checkUserSaved(): boolean{
    return this.post.userSaved.includes(this.authService.getLoggedUser().user.id);
  }

  checkUserHidden(): boolean{
    return this.post.userHidden.includes(this.authService.getLoggedUser().user.id);
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
