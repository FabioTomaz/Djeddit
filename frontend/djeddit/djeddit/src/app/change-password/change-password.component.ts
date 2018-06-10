import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../profile.service";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  username: string;
  oldPassowrd: string;
  newPassoword: string;
  oldPasswordString: string;
  confirmNewPasswordString: string;
  newPasswordString: string;

  constructor(private route: ActivatedRoute,
              private profileService: ProfileService,
              private titleService: Title) { }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get("username");
    this.titleService.setTitle(this.username + ": Change Password");
  }

  onChangePassword() {
    this.profileService.changePassword(this.username, this.oldPassowrd, this.newPassoword).subscribe(
      () => {

      },
      (error) => {
        alert(error);
      }
    )
  }
}
