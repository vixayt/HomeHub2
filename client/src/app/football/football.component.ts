import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-football',
  templateUrl: './football.component.html',
  styleUrls: ['./football.component.scss']
})
export class FootballComponent implements OnInit {
  teams = [];
  constructor(private _http: HttpClient) { }

  ngOnInit() {
    this._http
      .get<any>('/api/teams', {

      })
      .subscribe(data =>{
        console.log(data.rows);
        this.teams = data.rows;
      });
  }

}
