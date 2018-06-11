import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Report} from '../report';
import {ReportService} from '../report.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
  topic_name: string;
  reports: Report[];

  constructor(private routeActive: ActivatedRoute,
              private  reportService: ReportService) { }

  ngOnInit() {
    this.getReports();
  }

  getReports() {
    this.topic_name = this.routeActive.snapshot.paramMap.get('topic_name');
    this.reportService.getReports(this.topic_name).subscribe(
      reports => {
        this.reports = reports;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
