import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-privacy',
  templateUrl: './user-privacy.component.html',
  styleUrls: ['./user-privacy.component.css']
})
export class UserPrivacyComponent implements OnInit {

  privacyChoices = [
    {id: 'N', name: "None"},
    {id: 'F', name: "Friends"},
    {id: 'E', name: "Everybody"}
  ];

  constructor(private titleService: Title,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.titleService.setTitle(this.route.snapshot.paramMap.get("username") + ": Privacy");
  }

}
