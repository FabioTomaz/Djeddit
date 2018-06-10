import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../profile.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  username: string;
  oldPassowrd: string;
  newPassoword: string;

  constructor(private route: ActivatedRoute,
              private profileService: ProfileService) { }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get("username");
  }

  onChangePassword() {
    this.profileService.changePassword(this.username, this.oldPassowrd, this.newPassoword).subscribe(
      () => {

      },
      (error) => {
        console.log(error);
      }
    )
  }
}
