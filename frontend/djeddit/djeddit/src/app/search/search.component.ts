import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  q: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.q = this.activatedRoute.snapshot.queryParams["q"] ;
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
