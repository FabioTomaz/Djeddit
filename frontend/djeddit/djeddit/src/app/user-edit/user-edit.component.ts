import { Component, OnInit } from '@angular/core';
import {Profile} from "../profile";
import {ActivatedRoute} from "@angular/router";
import {ProfileService} from "../profile.service";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  profile: Profile;
  selectedImage = null;
  genders = [
    {id: 'M', name: "Male"},
    {id: 'F', name: "Female"},
    {id: 'N', name: "None"}
  ];

  constructor(private route: ActivatedRoute,
              private profileService: ProfileService,
              private location: Location) { }

  ngOnInit() {
    this.getProfile(this.route.snapshot.paramMap.get("username"));
  }

  getProfile(username: string){
    this.profileService.getProfileByUsername(username).subscribe((profile) => {
        this.profile = profile;
        this.profile.user_picture = "http://127.0.0.1:8000" + this.profile.user_picture;
    });
  }

  onImageSelected(event) {
    this.selectedImage = event.target.files[0];
  }

  onSubmit() {
    this.profileService.update(this.profile);
  }
}
