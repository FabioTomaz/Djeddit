import { Injectable } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Report} from "./report";
import {Topic} from './topic';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private baseUrl = 'http://127.0.0.1:8000/ws/';

  constructor(private http: HttpClient) { }

  getReport(report_id: string): Observable<Report>{
    const url = this.baseUrl + 'report/' + report_id;
    return this.http.get<Report>(url);
  }

  getReports(topic_name: string): Observable<Report[]> {
    const url = this.baseUrl + 'reports/' + topic_name;
    return this.http.get<Report[]>(url);
  }

  sendReport(report: Report): Observable<Report> {
    const url = this.baseUrl + 'report_post';
    return this.http.post<Report>(url, report, httpOptions);
  }

  handleReport(action: string): Observable<string> {
    const url = this.baseUrl + 'handle_report';
    return this.http.post<string>(url, action, httpOptions);
  }
}
