import { Component, OnInit } from '@angular/core';
import {Profile} from "../profile";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  profile: Profile;

  constructor() { }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get("username");
  }

}
