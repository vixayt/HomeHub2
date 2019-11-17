import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { database } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';



@Component({
  selector: 'app-football',
  templateUrl: './football.component.html',
  styleUrls: ['./football.component.scss'],
})
export class FootballComponent implements OnInit {
  teams : any = [];
  team: string;
  constructor(private http: HttpClient) { }
    ngOnInit() {
      this.http
        .get<String[]>('/api/teams', {
      })
      .subscribe(data =>{
        this.teams.push(data);
        console.log(this.teams);
      });

      

   }

 


}




