import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-trimet',
  templateUrl: './trimet.component.html',
  styleUrls: ['./trimet.component.scss']
})
export class TrimetComponent implements OnInit {
  arrival: object;
  location: object;
  constructor(private _http: HttpClient) {}

  ngOnInit() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this._http.get<any>('/api/trimet').subscribe(data => {
      this.arrival = data.trimetData.arrival;
      this.location = data.trimetData.location;
    });
  }

  getTime(time) {
    const now = Date.now();
    return new Date(time - now).getMinutes();
  }
}
