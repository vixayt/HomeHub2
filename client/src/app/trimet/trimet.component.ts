import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {
  BlueToGreshem,
  BlueToHillsboro,
  GreenToClackamas,
  GreenToPSU,
  OrangeToCityCenter,
  OrangeToMilwaukie,
  RedToAirport,
  RedToBeaverton,
  YellowToCityCenter,
  YellowToExpoCenter
} from "./utils/trimetMaxIds.utils";

@Component({
  selector: "app-trimet",
  templateUrl: "./trimet.component.html",
  styleUrls: ["./trimet.component.scss"]
})
export class TrimetComponent implements OnInit {
  arrival: object;
  selectedLocation: string = "";
  errorMessage: string = "";
  lineOptions: object = [
    { value: "BlueToGresham", longName: "MAX Blue Line To Gresham" },
    { value: "BlueToHillsboro", longName: "MAX Blue Line To Hillsboro" },
    {
      value: "RedToAirport",
      longName: "MAX Red Line to Portland International Airport"
    },
    {
      value: "RedToBeaverton",
      longName: "MAX Red Line to Beaverton Transit Center"
    },
    {
      value: "GreenToClackamas",
      longName: "MAX Green Line to Clackamas Town Center"
    },
    {
      value: "GreenToPSU",
      longName: "MAX Green Line to Portland City Center/PSU"
    },
    { value: "YellowToExpoCenter", longName: "MAX Yellow Line to Expo Center" },
    {
      value: "YellowToCityCenter",
      longName: "MAX Yellow Line to Portland City Center"
    },
    {
      value: "OrangeToCityCenter",
      longName: "MAX Orange Line To Portland City Center"
    },
    { value: "OrangeToMilwaukie", longName: "MAX Orange Line to Milwaukie" }
  ];
  selectedLine: string;
  selectedLocations: string[] = [];
  location: object;
  constructor(private _http: HttpClient) {}

  ngOnInit() {
    this._http
      .get<any>("/api/trimet", {
        params: {
          locations: "9821"
        }
      })
      .subscribe(data => {
        this.arrival = data.trimetData.arrival;
        this.location = data.trimetData.location;
      });
  }

  getMaxArrivalTimes() {
    this.errorMessage = "";
    this._http
      .get<any>("/api/trimet", {
        params: {
          locations: this.selectedLocations.join()
        }
      })
      .subscribe(data => {
        if (Object.entries(data).length === 0 && data.constructor === Object) {
          this.errorMessage = "Please add a new MAX line";
        } else {
          this.arrival = data.trimetData.arrival;
          this.location = data.trimetData.location;
        }
      });
  }

  getTime(time) {
    const now = Date.now();
    return new Date(time - now).getMinutes();
  }

  addLocation() {
    this.selectedLocations.push(this.selectedLine);
    console.log(this.selectedLocations.join());
  }
}
