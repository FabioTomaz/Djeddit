import {Component, Input, OnInit} from '@angular/core';
import {ProfileService} from "../profile.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Profile} from "../profile";

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {
  users: Profile[];
  q: string;

  constructor(private profileService: ProfileService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.q = this.activatedRoute.snapshot.queryParams["q"];
    this.profileService.searchProfilesByUsername(this.q).subscribe(users => {this.users = users;});
  }

}
