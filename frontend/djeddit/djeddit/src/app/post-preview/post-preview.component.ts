import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../post';
import {AuthenticationService} from "../authentication.service";
import {PostService} from "../post.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.css']
})
export class PostPreviewComponent implements OnInit {
  @Input() post: Post;

  constructor(private authService: AuthenticationService,
              private postService: PostService,
              private router: Router) { }

  ngOnInit() {
  }

  checkAuth(): boolean {
    return this.authService.userLoggedIn();
  }

  checkLoggedUserIsOP(): boolean{
    return this.authService.getLoggedProfile().user.username === this.post.userOP.username;
  }

  checkUserSaved(): boolean{
    return this.post.userSaved.includes(this.authService.getLoggedProfile().user.id);
  }

  checkUserHidden(): boolean{
    return this.post.userHidden.includes(this.authService.getLoggedProfile().user.id);
  }

  unsavePost() {
    this.postService.unsavePost(this.post.id, this.authService.getLoggedProfile()).subscribe(
      (result) => {
        this.post = result;
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  savePost() {
    this.postService.savePost(this.post.id, this.authService.getLoggedProfile()).subscribe(
      (result) => {
        this.post = result;
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  hidePost() {
    this.postService.hidePost(this.post.id, this.authService.getLoggedProfile()).subscribe(
      (result) => {
        this.post = result;
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  showPost() {
    this.postService.unhidePost(this.post.id, this.authService.getLoggedProfile()).subscribe(
      (result) => {
        this.post = result;
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  inProfileHiddenRoute() {
    return this.router.url === ("/user/" + this.authService.getLoggedProfile().user.username + "/posts/hidden");
  }
}
