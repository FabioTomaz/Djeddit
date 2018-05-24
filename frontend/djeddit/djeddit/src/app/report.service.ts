import { Injectable } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {HttpClient} from "@angular/common/http";
import {Report} from "./report";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private baseUrl = 'http://127.0.0.1:8000/ws/';
  constructor(private http: HttpClient) { }

  getReport(name: string): Observable<Report>{
    const url = this.baseUrl + 'report?name=' + name;
    return this.http.get<Report>(url);
  }

  getReports(): Observable<Report[]>{
    const url = this.baseUrl + 'reports';
    return this.http.get<Report[]>(url);
  }
}
