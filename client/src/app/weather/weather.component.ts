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
  toSearch: string;
  todaysForecast: object;
  summary: string;
  forecasts: object;
  lat: number;
  lon: number;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.city = 'Beaverton';
    this.summary = null;
    this.http
      .get<any>('/api/weather', {
        params: {
          city: this.city
        }
      })
      .subscribe(data => {
        this.todaysForecast = data.weatherData.current;
        this.summary = data.weatherData.dailyForecast.summary;
        this.forecasts = data.weatherData.dailyForecast.data;
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
  getWeatherForecast() {
    this.city = this.toSearch;
    this.summary = null;
    this.http
      .get<any>('/api/weather', {
        params: {
          city: this.toSearch
        }
      })
      .subscribe(data => {
        this.todaysForecast = data.weatherData.current;
        this.summary = data.weatherData.dailyForecast.summary;
        this.forecasts = data.weatherData.dailyForecast.data;
      });
  }
}
