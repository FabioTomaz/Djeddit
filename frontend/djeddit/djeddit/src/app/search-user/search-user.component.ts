import {Component, Input, OnInit} from '@angular/core';
import {ProfileService} from '../profile.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Profile} from '../profile';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {
  users: Profile[];
  q: string;
  orderby: string;
  name: string;
  email: string;

  constructor(private profileService: ProfileService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.q = this.activatedRoute.snapshot.queryParams['q'];
    this.orderby = this.activatedRoute.snapshot.queryParams['orderby'];
    this.name = this.activatedRoute.snapshot.queryParams['name'];
    this.email = this.activatedRoute.snapshot.queryParams['email'];

    if (this.email == null) {
      this.email = '';
    }
    if (this.name == null) {
      this.name = '';
    }
    if (this.orderby == null) {
      this.orderby = 'Alphabetical order';
    }

    this.profileService.searchProfiles(this.q, this.name, this.email, this.orderby).subscribe(users => {this.users = users; });
  }

  searchUsers(query: string, nameQ: string, emailQ: string, orderQ: string ) {
    this.router.navigate(['/search/user'], { queryParams: { q: query, name: nameQ,
        email: emailQ, orderby: orderQ}});
    // page does not reload on its own
    location.reload();
  }
}
