import { Component, OnInit } from '@angular/core';
import {Profile} from "../profile";
import {ActivatedRoute} from "@angular/router";
import {ProfileService} from "../profile.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  profile: Profile = new Profile();
  imageUrl: string;
  genders = [
    {id: 'M', name: "Male"},
    {id: 'F', name: "Female"},
    {id: 'N', name: "None"}
  ];

  constructor(private route: ActivatedRoute,
              private profileService: ProfileService,
              private titleService: Title) { }

  ngOnInit() {
    this.getProfile(this.route.snapshot.paramMap.get("username"));
    this.titleService.setTitle(this.route.snapshot.paramMap.get("username") + ": Edit Profile");
  }

  getProfile(username: string){
    this.profileService.getProfileByUsername(username).subscribe((profile) => {
        this.profile = profile;
        this.imageUrl = "http://127.0.0.1:8000" + this.profile.user_picture;
    });
  }

  onImageSelected(file: FileList) {
    this.profile.user_picture = file.item(0);
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }

    reader.readAsDataURL(this.profile.user_picture)
  }

  onEditProfile() {
    this.profileService.update(this.profile).subscribe(
      () => {

      },
      (error) => {
        console.log(error);
      }
    )
  }
}
