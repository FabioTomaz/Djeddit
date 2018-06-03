import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Post} from '../post';
import {PostService} from '../post.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-search-post',
  templateUrl: './search-post.component.html',
  styleUrls: ['./search-post.component.css']
})
export class SearchPostComponent implements OnInit {
  posts: Post[];
  q: string;
  orderby: string;
  op: string;
  from_topic: string;

  constructor(private postService: PostService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.q = this.activatedRoute.snapshot.queryParams['q'];
    this.orderby = this.activatedRoute.snapshot.queryParams['orderby'];
    this.op = this.activatedRoute.snapshot.queryParams['op'];
    this.from_topic = this.activatedRoute.snapshot.queryParams['from_topic'];

    if (this.op == null) {
      this.op = '';
    }
    if (this.from_topic == null) {
      this.from_topic = '';
    }
    if (this.orderby == null) {
      this.orderby = 'Highest score';
    }

    this.postService.searchPosts(this.q, this.op, this.from_topic, this.orderby).subscribe(posts => {this.posts = posts; });
  }

  searchPosts(query: string, opQ: string, from_topicQ: string, orderQ: string ) {
    this.router.navigate(['/search/post'], { queryParams: { q: query, op: opQ,
        from_topic: from_topicQ, orderby: orderQ}});
    // page does not reload on its own
    location.reload();
  }

}
