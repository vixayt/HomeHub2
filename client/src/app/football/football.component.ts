import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  years = ['2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  year: string;
  received_data: Boolean = false;
  gameData: any = [];
  footballError: string = '';

  constructor(private http: HttpClient) { }
    ngOnInit() {
      this.http
        .get<any>('/api/teams')
      .subscribe(data =>{
        for(var d in data)
        {
          this.teams.push(data[d].name);
        }
      });
    }

    selectedTeam(team: string)
    {
      this.team = team;
    }

    selectedYear(year: string)
    {
      this.year = year;
    }

    getTeamsGames() {
      if(this.team == '' || this.year == undefined){
        this.footballError = "Select a team an a year";
        return;
      } else {
        let params = new HttpParams();
        params = params.append("team", this.team);
        params = params.append("year", this.year);
        this.http
          .get<any>('/api/games', {
            params: params
          })
          .subscribe(data =>{
            this.gameData = [];
            for(var d in data)
            { 
              this.gameData.push(JSON.parse(JSON.stringify(data[d])));
              this.gameData[d].gameLeaders=null;
            }
            this.received_data= true;
            this.getLeaders();
          });
          
      }
      
    }

    getLeaders() {
    
      for(var g in this.gameData)
      {
  
        let params: any;
        //get leaders for home team
        params = new HttpParams();
      
        params = params.append("team", this.gameData[g].home_team);
        params = params.append("game", this.gameData[g].game_id);
        this.http
          .get<any>('api/leaders', {
            params: params
          })
          .subscribe(data => {
            for(var d in data)
            {
              this.gameData.gameLeaders.home_team.push(data[d]);
            }
          });
        console.log(this.gameData[g].home_team)

        //get leaders for away team
        params = new HttpParams();
      }

    }



}




