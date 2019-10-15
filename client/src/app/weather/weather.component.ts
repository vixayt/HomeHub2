import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { days } from '../utils/DayEnum';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  city: string;
  todaysForecast: object;
  summary: string;
  forecasts: object;
  lat: number;
  lon: number;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.city = 'Beaverton';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .post<any>('/api/weather', JSON.stringify({ city: this.city }), {
        headers: headers,
        observe: 'response'
      })
      .subscribe(data => {
        this.todaysForecast = data.body.weatherResults.current;
        this.summary = data.body.weatherResults.dailyForecast.summary;
        this.forecasts = data.body.weatherResults.dailyForecast.data;
      });
  }

  getDay(time) {
    return days[new Date(time * 1000).getDay()];
  }
  isToday(today) {
    return new Date(Date.now()).getDate() === new Date(today * 1000).getDate();
  }

  // make enum
  weatherIcon(icon) {
    switch (icon) {
      case 'partly-cloudy-day':
        return 'wi wi-day-cloudy';
      case 'clear-day':
        return 'wi wi-day-sunny';
      case 'partly-cloudy-night':
        return 'wi wi-night-partly-cloudy';
      case 'rain':
        return 'wi wi-day-rain';
      default:
        return `wi wi-day-sunny`;
    }
  }
  getWeatherForecast() {}
}
