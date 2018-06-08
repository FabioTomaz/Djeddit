import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
