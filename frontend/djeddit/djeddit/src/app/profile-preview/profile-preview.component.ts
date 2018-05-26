import {Component, Input, OnInit} from '@angular/core';
import {Profile} from "../profile";

@Component({
  selector: 'app-profile-preview',
  templateUrl: './profile-preview.component.html',
  styleUrls: ['./profile-preview.component.css']
})
export class ProfilePreviewComponent implements OnInit {
  @Input profile: Profile;

  constructor() { }

  ngOnInit() {
  }

}
