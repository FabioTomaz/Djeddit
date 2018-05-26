import {Component, Input, OnInit} from '@angular/core';
import {Report} from "../report";

@Component({
  selector: 'app-report-preview',
  templateUrl: './report-preview.component.html',
  styleUrls: ['./report-preview.component.css']
})
export class ReportPreviewComponent implements OnInit {

  @Input() report: Report;

  constructor() { }

  ngOnInit() {
  }

  refuseReport(): void{

  }

  acceptReport(): void{

  }

}
