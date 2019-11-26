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
        this.year = this.years[0];
        this.team = this.teams[0];
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
              this.gameData[d].gameLeaders= {};
              this.gameData[d].expanded = false;
            }
            this.received_data= true;
            this.getLeaders();
          });   
      }
    }

    async getLeaders() {
    
      for(var g in this.gameData)
      {
  
        console.log("hello");
        let params: any;
        this.gameData[g].gameLeaders.home_team = {}
        this.gameData[g].gameLeaders.away_team = {}
        //get leaders for home team
        params = new HttpParams();
      
        params = params.append("team", this.gameData[g].home_team);
        params = params.append("game", this.gameData[g].game_id);
        console.log(this.gameData[g].home_team);
        console.log(this.gameData[g].game_id);
        var home_response = await this.http.get<any>('api/leaders', {params: params}).toPromise();
        console.log(home_response);
        this.gameData[g].gameLeaders.home_team = JSON.parse(JSON.stringify(home_response));
        
        params = new HttpParams();
        params = params.append("team", this.gameData[g].away_team);
        params = params.append("game", this.gameData[g].game_id);
        var away_response = await this.http.get<any>('api/leaders', {params: params}).toPromise();
        console.log(away_response);
        this.gameData[g].gameLeaders.away_team = JSON.parse(JSON.stringify(away_response));
        
      }
    }
}




