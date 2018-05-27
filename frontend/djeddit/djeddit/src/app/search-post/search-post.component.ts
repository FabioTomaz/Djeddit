import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../post";
import {PostService} from "../post.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-search-post',
  templateUrl: './search-post.component.html',
  styleUrls: ['./search-post.component.css']
})
export class SearchPostComponent implements OnInit {
  posts: Post[];
  q: string;

  constructor(private postService: PostService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.q = this.activatedRoute.snapshot.queryParams["q"];
    this.postService.searchPostsByTitle(this.q).subscribe(posts => {this.posts = posts;});
  }

  searchUsers() {
    if(this.q){
      this.router.navigate(['/search/user'], { queryParams: { q: this.q}});
    }
  }

  searchTopics() {
    if(this.q){
      this.router.navigate(['/search/topic'], { queryParams: { q: this.q}});
    }
  }

  searchPosts() {
    if(this.q){
      this.router.navigate(['/search/post'], { queryParams: { q: this.q}});
    }
  }
}
