import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  city: string;
  openWeatherMapApiKey: string = '9b258de3163f345fa8401ea91f6462e6';
  darkSkyWeatherForecastApiKey: string = '65ef0280349d15c627c21c64833e88dd';
  dailySummary: string;
  lat: number;
  lon: number;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.city = 'Beaverton';
    this.http
      .get<any>(
        `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=imperial&APPID=${this.openWeatherMapApiKey}`
      )
      .subscribe(openWeatherMapData => {
        console.log(openWeatherMapData.coord);
        this.lat = openWeatherMapData.coord.lat;
        this.lon = openWeatherMapData.coord.lon;
      });
  }

  getWeatherForecast() {
    console.log('called');
    this.http
      .get<any>(
        `https://api.darksky.net/forecast/${this.darkSkyWeatherForecastApiKey}/${this.lat},${this.lon}`
      )
      .subscribe(darkSkyWeatherData => {
        console.log('dark:', darkSkyWeatherData);
        this.dailySummary = darkSkyWeatherData.daily.summary;
      });
  }
}
