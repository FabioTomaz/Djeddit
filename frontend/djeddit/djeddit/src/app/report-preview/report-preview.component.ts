import {Component, Input, OnInit} from '@angular/core';
import {Report} from "../report";
import {ProfileService} from '../profile.service';
import {AuthenticationService} from '../authentication.service';
import {ReportService} from '../report.service';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-report-preview',
  templateUrl: './report-preview.component.html',
  styleUrls: ['./report-preview.component.css']
})
export class ReportPreviewComponent implements OnInit {

  @Input() report: Report;
  solved: boolean;

  constructor(private reportService: ReportService,
              private router: Router) { }

  ngOnInit() {
    this.solved = false;
  }


  refuseReport(): void {
    const vote = JSON.stringify({
      report_id: this.report.id, action: 'refuse'
    });
    console.log(vote);
    this.reportService.handleReport(vote).subscribe(data => {
      // console.log(JSON.stringify(data));
      console.log(data);
      this.solved = true;
    }, (err) => {
      console.log(err);
    });
  }

  acceptReport(): void {
    const vote = JSON.stringify({
      report_id: this.report.id, action: 'accept'
    });
    console.log(vote);
    this.reportService.handleReport(vote).subscribe(data => {
      // console.log(JSON.stringify(data));
      console.log(data);
      this.solved = true;
    }, (err) => {
      console.log(err);
    });
  }

}
