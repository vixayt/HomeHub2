import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-trimet',
  templateUrl: './trimet.component.html',
  styleUrls: ['./trimet.component.scss']
})
export class TrimetComponent implements OnInit {
  arrival: object;
  selectedLocation: string = '';
  errorMessage: string = '';
  lineOptions: object = [
    { value: 'BlueToGresham', longName: 'MAX Blue Line To Gresham' },
    { value: 'BlueToHillsboro', longName: 'MAX Blue Line To Hillsboro' },
    {
      value: 'RedToAirport',
      longName: 'MAX Red Line to Portland International Airport'
    },
    {
      value: 'RedToBeaverton',
      longName: 'MAX Red Line to Beaverton Transit Center'
    },
    {
      value: 'GreenToClackamas',
      longName: 'MAX Green Line to Clackamas Town Center'
    },
    {
      value: 'GreenToPSU',
      longName: 'MAX Green Line to Portland City Center/PSU'
    },
    { value: 'YellowToExpoCenter', longName: 'MAX Yellow Line to Expo Center' },
    {
      value: 'YellowToCityCenter',
      longName: 'MAX Yellow Line to Portland City Center'
    },
    {
      value: 'OrangeToCityCenter',
      longName: 'MAX Orange Line To Portland City Center'
    },
    { value: 'OrangeToMilwaukie', longName: 'MAX Orange Line to Milwaukie' }
  ];
  selectedLine: string;
  selectedLocations: string[] = [];
  location: object;
  constructor(private _http: HttpClient) {}

  ngOnInit() {
    this._http
      .get<any>('/api/trimet', {
        params: {
          locations: '9821'
        }
      })
      .subscribe(data => {
        this.arrival = data.trimetData.arrival;
        this.location = data.trimetData.location;
      });
  }

  getMaxArrivalTimes() {
    this.errorMessage = '';
    this._http
      .get<any>('/api/trimet', {
        params: {
          locations: this.selectedLocations.join()
        }
      })
      .subscribe(data => {
        if (Object.entries(data).length === 0 && data.constructor === Object) {
          this.errorMessage = 'Please add a new MAX line';
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

  BlueToGreshem: object = [
    {
      longName: 'Hatfield Government Center MAX Station (#9848)',
      value: '9848'
    },
    {
      longName: 'Tuality Hospital/SE 8th Ave MAX Station (#9843)',
      value: '9843'
    },
    { longName: 'Washington/SE 12th Ave MAX Station (#9841)', value: '9841' },
    {
      longName: 'Hillsboro Central/SE 3rd TC MAX Station (#9846)',
      value: '9846'
    },
    {
      longName: 'Fair Complex/Hillsboro Airport MAX Stn (#9838)',
      value: '9838'
    },
    { longName: 'Hawthorn Farm MAX Station (#9839)', value: '9839' },
    { longName: 'Orenco MAX Station (#9835)', value: '9835' },
    { longName: 'Quatama MAX Station (#9834)', value: '9834' },
    {
      longName: 'Willow Creek/SW 185th Ave TC MAX Station (#9831)',
      value: '9831'
    },
    { longName: 'Elmonica/SW 170th Ave MAX Station (#9830)', value: '9830' },
    { longName: 'Merlo Rd/SW 158th Ave MAX Station (#9828)', value: '9828' },
    { longName: 'Beaverton Creek MAX Station (#9822)', value: '9822' },
    { longName: 'Millikan Way MAX Station (#9826)', value: '9826' },
    { longName: 'Beaverton Central MAX Station (#9824)', value: '9824' },
    { longName: 'Beaverton TC MAX Station (#9821)', value: '9821' },
    { longName: 'Sunset TC MAX Station (#9969)', value: '9969' },
    { longName: 'Washington Park MAX Station (#10120)', value: '10120' },
    {
      longName: 'Goose Hollow/SW Jefferson St MAX Station (#10118)',
      value: '10118'
    },
    { longName: 'Kings Hill/SW Salmon St MAX Station (#9759)', value: '9759' },
    { longName: 'Providence Park MAX Station (#9758)', value: '9758' },
    { longName: 'Library/SW 9th Ave MAX Station (#8333)', value: '8333' },
    { longName: 'Pioneer Square South MAX Station (#8334)', value: '8334' },
    { longName: 'Mall/SW 4th Ave MAX Station (#8335)', value: '8335' },
    { longName: 'Yamhill District MAX Station (#8336)', value: '8336' },
    { longName: 'Oak/ SW 1st Ave MAX Station (#8337)', value: '8337' },
    { longName: 'Skidmore Fountain MAX Station (#8338)', value: '8338' },
    { longName: 'Old Town/Chinatown MAX Station (#8339)', value: '8339' },
    { longName: 'Rose Quarter TC MAX Station (#8340)', value: '8340' },
    { longName: 'Convention Center MAX Station (#8341)', value: '8341' },
    { longName: 'NE 7th Ave MAX Station (#8342)', value: '8342' },
    { longName: 'Lloyd Center/NE 11th Ave MAX Station (#8343)', value: '8343' },
    { longName: 'Hollywood/NE 42nd Ave TC MAX Station (#8344)', value: '8344' },
    { longName: 'NE 60th Ave MAX Station (#8345)', value: '8345' },
    { longName: 'NE 82nd Ave MAX Station (#8346)', value: '8346' },
    { longName: 'Gateway/NE 99th Ave TC MAX Station (#8347)', value: '8347' },
    { longName: 'E 102nd Ave MAX Station (#8348)', value: '8348' },
    { longName: 'E 122nd Ave MAX Station (#8349)', value: '8349' },
    { longName: 'E 148th Ave MAX Station (#8350)', value: '8350' },
    { longName: 'E 162nd Ave MAX Station (#8351)', value: '8351' },
    { longName: 'E 172nd Ave MAX Station (#8352)', value: '8352' },
    { longName: 'E 181st Ave MAX Station (#8353)', value: '8353' },
    { longName: 'Rockwood/E 188th Ave MAX Station (#8354)', value: '8354' },
    {
      longName: 'Ruby Junction/E 197th Ave MAX Station (#8355)',
      value: '8355'
    },
    { longName: 'Civic Drive MAX Station (#13450)', value: '13450' },
    { longName: 'Gresham City Hall MAX Station (#8356)', value: '8356' },
    { longName: 'Gresham Central TC MAX Station (#8357)', value: '8357' },
    { longName: 'Cleveland Ave MAX Station (#8359)', value: '8359' }
  ];
  BlueToHillsboro: object = [
    { longName: 'Cleveland Ave MAX Station (#8359)', value: '8359' },
    { longName: 'Gresham Central TC MAX Station (#8360)', value: '8360' },
    { longName: 'Gresham City Hall MAX Station (#8361)', value: '8361' },
    { longName: 'Civic Drive MAX Station (#13449)', value: '13449' },
    {
      longName: 'Ruby Junction/E 197th Ave MAX Station (#8362)',
      value: '8362'
    },
    { longName: 'Rockwood/E 188th Ave MAX Station (#8363)', value: '8363' },
    { longName: 'E 181st Ave MAX Station (#8364)', value: '8364' },
    { longName: 'E 172nd Ave MAX Station (#8365)', value: '8365' },
    { longName: 'E 162nd Ave MAX Station (#8366)', value: '8366' },
    { longName: 'E 148th Ave MAX Station (#8367)', value: '8367' },
    { longName: 'E 122nd Ave MAX Station (#8368)', value: '8368' },
    { longName: 'E 102nd Ave MAX Station (#8369)', value: '8369' },
    { longName: 'Gateway/NE 99th Ave TC MAX Station (#8370)', value: '8370' },
    { longName: 'NE 82nd Ave MAX Station (#8371)', value: '8371' },
    { longName: 'NE 60th Ave MAX Station (#8372)', value: '8372' },
    { longName: 'Hollywood/NE 42nd Ave TC MAX Station (#8373)', value: '8373' },
    { longName: 'Lloyd Center/NE 11th Ave MAX Station (#8374)', value: '8374' },
    { longName: 'NE 7th Ave MAX Station (#8375)', value: '8375' },
    { longName: 'Convention Center MAX Station (#8376)', value: '8376' },
    { longName: 'Rose Quarter TC MAX Station (#8377)', value: '8377' },
    { longName: 'Old Town/Chinatown MAX Station (#8378)', value: '8378' },
    { longName: 'Skidmore Fountain MAX Station (#8379)', value: '8379' },
    { longName: 'Oak/ SW 1st Ave MAX Station (#8380)', value: '8380' },
    { longName: 'Morrison/SW 3rd Ave MAX Station (#8381)', value: '8381' },
    { longName: 'Mall/SW 5th Ave MAX Station (#8382)', value: '8382' },
    { longName: 'Pioneer Square North MAX Station (#8383)', value: '8383' },
    { longName: 'Galleria/SW 10th Ave MAX Station (#8384)', value: '8384' },
    { longName: 'Providence Park MAX Station (#9757)', value: '9757' },
    { longName: 'Kings Hill/SW Salmon St MAX Station (#9820)', value: '9820' },
    {
      longName: 'Goose Hollow/SW Jefferson St MAX Station (#10117)',
      value: '10117'
    },
    { longName: 'Washington Park MAX Station (#10121)', value: '10121' },
    { longName: 'Sunset TC MAX Station (#9624)', value: '9624' },
    { longName: 'Beaverton TC MAX Station (#9818)', value: '9818' },
    { longName: 'Beaverton Central MAX Station (#9823)', value: '9823' },
    { longName: 'Millikan Way MAX Station (#9825)', value: '9825' },
    { longName: 'Beaverton Creek MAX Station (#9819)', value: '9819' },
    { longName: 'Merlo Rd/SW 158th Ave MAX Station (#9827)', value: '9827' },

    { longName: 'Elmonica/SW 170th Ave MAX Station (#9829)', value: '9829' },
    {
      longName: 'Willow Creek/SW 185th Ave TC MAX Station (#9832)',
      value: '9832'
    },
    { longName: 'Quatama MAX Station (#9833)', value: '9833' },
    { longName: 'Orenco MAX Station (#9836)', value: '9836' },
    { longName: 'Hawthorn Farm MAX Station (#9840)', value: '9840' },
    {
      longName: 'Fair Complex/Hillsboro Airport MAX Stn (#9837)',
      value: '9837'
    },
    { longName: 'Washington/SE 12th Ave MAX Station (#9842)', value: '9842' },
    {
      longName: 'Tuality Hospital/SE 8th Ave MAX Station (#9844)',
      value: '9844'
    },
    {
      longName: 'Hillsboro Central/SE 3rd TC MAX Station (#9845)',
      value: '9845'
    },
    {
      longName: 'Hatfield Government Center MAX Station (#9848)',
      value: '9848'
    }
  ];
  GreenToClackamas: object = [
    {
      longName: 'PSU South/SW 6th & College MAX Stn (#10293)',
      value: '10293'
    },
    {
      longName: 'PSU Urban Center/SW 6th & Montgomery MAX Stn (#7774)',
      value: '7774'
    },
    { longName: 'SW 6th & Madison MAX Station (#13123)', value: '13123' },
    {
      longName: 'Pioneer Courthouse/SW 6th Ave MAX Stn (#7777)',
      value: '7777'
    },
    { longName: 'SW 6th & Pine MAX Station (#7787)', value: '7787' },
    { longName: 'NW 6th & Davis MAX Station (#9299)', value: '9299' },
    {
      longName: 'Union Station/NW 6th & Hoyt MAX Stn (#7763)',
      value: '7763'
    },
    { longName: 'Rose Quarter TC MAX Station (#8340)', value: '8340' },
    { longName: 'Convention Center MAX Station (#8341)', value: '8341' },
    { longName: 'NE 7th Ave MAX Station (#8342)', value: '8342' },
    { longName: 'Lloyd Center/NE 11th Ave MAX Station (#8343)', value: '8343' },
    { longName: 'Hollywood/NE 42nd Ave TC MAX Station (#8344)', value: '8344' },
    { longName: 'NE 60th Ave MAX Station (#8345)', value: '8345' },
    { longName: 'NE 82nd Ave MAX Station (#8346)', value: '8346' },
    { longName: 'Gateway/NE 99th Ave TC MAX Station (#8347)', value: '8347' },
    { longName: 'SE Main St MAX Station (#13124)', value: '13124' },
    { longName: 'SE Division St MAX Station (#13125)', value: '13125' },
    { longName: 'SE Powell Blvd MAX Station (#13126)', value: '13126' },
    { longName: 'SE Holgate Blvd MAX Station (#13127)', value: '13127' },
    { longName: 'Lents/SE Foster Rd MAX Station (#13128)', value: '13128' },
    { longName: 'SE Flavel St MAX Station (#13129)', value: '13129' },
    { longName: 'SE Fuller Rd MAX Station (#13130)', value: '13130' },
    {
      longName: 'Clackamas Town Center TC MAX Station (#13132)',
      value: '13132'
    }
  ];
  GreenToPSU: object = [
    {
      longName: 'Clackamas Town Center TC MAX Station (#13132)',
      value: '13132'
    },
    { longName: 'SE Fuller Rd MAX Station (#13133)', value: '13133' },
    { longName: 'SE Flavel St MAX Station (#13134)', value: '13134' },
    { longName: 'Lents/SE Foster Rd MAX Station (#13135)', value: '13135' },
    { longName: 'SE Holgate Blvd MAX Station (#13136)', value: '13136' },
    { longName: 'SE Powell Blvd MAX Station (#13137)', value: '13137' },
    { longName: 'SE Division St MAX Station (#13138)', value: '13138' },
    { longName: 'SE Main St MAX Station (#13139)', value: '13139' },
    { longName: 'Gateway/NE 99th Ave TC MAX Station (#8370)', value: '8370' },
    { longName: 'NE 82nd Ave MAX Station (#8371)', value: '8371' },
    { longName: 'NE 60th Ave MAX Station (#8372)', value: '8372' },
    { longName: 'Hollywood/NE 42nd Ave TC MAX Station (#8373)', value: '8373' },
    { longName: 'Lloyd Center/NE 11th Ave MAX Station (#8374)', value: '8374' },
    { longName: 'NE 7th Ave MAX Station (#8375)', value: '8375' },
    { longName: 'Convention Center MAX Station (#8376)', value: '8376' },
    { longName: 'Rose Quarter TC MAX Station (#8377)', value: '8377' },
    {
      longName: 'Union Station/NW 5th & Glisan MAX Stn (#7601)',
      value: '7601'
    },
    { longName: 'NW 5th & Couch MAX Station (#9303)', value: '9303' },
    { longName: 'SW 5th & Oak MAX Station (#7627)', value: '7627' },
    { longName: 'Pioneer Place/SW 5th Ave MAX Station (#7646)', value: '7646' },
    {
      longName: 'City Hall/SW 5th & Jefferson MAX Station (#7608)',
      value: '7608'
    },
    {
      longName: 'PSU Urban Center/SW 5th & Mill MAX Station (#7618)',
      value: '7618'
    }
  ];

  OrangeToCityCenter: object = [
    { longName: 'SE Park Ave MAX Station (#13720)', value: '13720' },
    { longName: 'Milwaukie/Main St MAX Station (#13721)', value: '13721' },
    {
      longName: 'SE Tacoma/Johnson Creek MAX Station (#13722)',
      value: '13722'
    },
    { longName: 'SE Bybee Blvd MAX Station (#13723)', value: '13723' },
    {
      longName: 'SE 17th Ave & Holgate Blvd MAX Station (#13724)',
      value: '13724'
    },
    {
      longName: 'SE 17th Ave & Rhine St MAX Station (#13725)',
      value: '13725'
    },
    { longName: 'Clinton St/SE 12th Ave MAX Station (#13726)', value: '13726' },
    { longName: 'OMSI/SE Water MAX Station (#13727)', value: '13727' },
    {
      longName: 'South Waterfront/SW Moody MAX Station (#13728)',
      value: '13728'
    },
    { longName: 'Lincoln St/SW 3rd Ave MAX Station (#13729)', value: '13729' },
    {
      longName: 'PSU South/SW 6th & College MAX Stn (#10293)',
      value: '10293'
    }
  ];

  OrangeToMilwaukie: object = [
    {
      longName: 'Union Station/NW 5th & Glisan MAX Stn (#7601)',
      value: '7601'
    },
    { longName: 'NW 5th & Couch MAX Station (#9303)', value: '9303' },
    { longName: 'SW 5th & Oak MAX Station (#7627)', value: '7627' },
    { longName: 'Pioneer Place/SW 5th Ave MAX Station (#7646)', value: '7646' },
    {
      longName: 'City Hall/SW 5th & Jefferson MAX Station (#7608)',
      value: '7608'
    },
    {
      longName: 'PSU Urban Center/SW 5th & Mill MAX Station (#7618)',
      value: '7618'
    },
    {
      longName: 'PSU South/SW 5th & Jackson MAX Stn (#7606)',
      value: '137606726'
    },
    { longName: 'Lincoln St/SW 3rd Ave MAX Station (#13710)', value: '13710' },
    {
      longName: 'South Waterfront/SW Moody MAX Station (#13711)',
      value: '13728'
    },
    { longName: 'OMSI/SE Water MAX Station (#13712)', value: '13712' },
    {
      longName: 'SE 17th Ave & Rhine St MAX Station (#13714)',
      value: '13714'
    },
    {
      longName: 'SE 17th Ave & Holgate Blvd MAX Station (#13715)',
      value: '13715'
    },
    { longName: 'SE Bybee Blvd MAX Station (#13716)', value: '13716' },
    {
      longName: 'SE Tacoma/Johnson Creek MAX Station (#13717)',
      value: '13717'
    },
    { longName: 'Milwaukie/Main St MAX Station (#13718)', value: '13718' },
    { longName: 'SE Park Ave MAX Station (#13720)', value: '13720' }
  ];

  RedToAirport: object = [
    { longName: 'Beaverton TC MAX Station (#9821)', value: '9821' },
    { longName: 'Sunset TC MAX Station (#9969)', value: '9969' },
    { longName: 'Washington Park MAX Station (#10120)', value: '10120' },
    {
      longName: 'Goose Hollow/SW Jefferson St MAX Station (#10118)',
      value: '10118'
    },
    { longName: 'Kings Hill/SW Salmon St MAX Station (#9759)', value: '9759' },
    { longName: 'Providence Park MAX Station (#9758)', value: '9758' },
    { longName: 'Library/SW 9th Ave MAX Station (#8333)', value: '8333' },
    { longName: 'Pioneer Square South MAX Station (#8334)', value: '8334' },
    { longName: 'Mall/SW 4th Ave MAX Station (#8335)', value: '8335' },
    { longName: 'Yamhill District MAX Station (#8336)', value: '8336' },
    { longName: 'Oak/ SW 1st Ave MAX Station (#8337)', value: '8337' },
    { longName: 'Skidmore Fountain MAX Station (#8338)', value: '8338' },
    { longName: 'Old Town/Chinatown MAX Station (#8339)', value: '8339' },
    { longName: 'Rose Quarter TC MAX Station (#8340)', value: '8340' },
    { longName: 'Convention Center MAX Station (#8341)', value: '8341' },
    { longName: 'NE 7th Ave MAX Station (#8342)', value: '8342' },
    { longName: 'Lloyd Center/NE 11th Ave MAX Station (#8343)', value: '8343' },
    { longName: 'Hollywood/NE 42nd Ave TC MAX Station (#8344)', value: '8344' },
    { longName: 'NE 60th Ave MAX Station (#8345)', value: '8345' },
    { longName: 'NE 82nd Ave MAX Station (#8346)', value: '8346' },
    { longName: 'Gateway/NE 99th Ave TC MAX Station (#8347)', value: '8347' },
    { longName: 'Parkrose/Sumner TC MAX Station (#10572)', value: '10572' },
    { longName: 'Cascades MAX Station (#10574)', value: '10574' },
    { longName: 'Mt Hood Ave MAX Station (#10576)', value: '10576' },
    { longName: "Portland Int'l Airport MAX Station (#10579)", value: '10579' }
  ];

  RedToBeaverton: object = [
    { longName: "Portland Int'l Airport MAX Station (#10579)", value: '10579' },
    { longName: 'Mt Hood Ave MAX Station (#10577)', value: '10577' },
    { longName: 'Cascades MAX Station (#10575)', value: '10575' },
    { longName: 'Parkrose/Sumner TC MAX Station (#10573)', value: '10573' },
    { longName: 'Gateway/NE 99th Ave TC MAX Station (#8370)', value: '8370' },
    { longName: 'NE 82nd Ave MAX Station (#8371)', value: '8371' },
    { longName: 'NE 60th Ave MAX Station (#8372)', value: '8372' },
    { longName: 'Hollywood/NE 42nd Ave TC MAX Station (#8373)', value: '8373' },
    { longName: 'Lloyd Center/NE 11th Ave MAX Station (#8374)', value: '8374' },
    { longName: 'NE 7th Ave MAX Station (#8375)', value: '8375' },
    { longName: 'Convention Center MAX Station (#8376)', value: '8376' },
    { longName: 'Rose Quarter TC MAX Station (#8377)', value: '8377' },
    { longName: 'Old Town/Chinatown MAX Station (#8378)', value: '8378' },
    { longName: 'Skidmore Fountain MAX Station (#8379)', value: '8379' },
    { longName: 'Oak/ SW 1st Ave MAX Station (#8380)', value: '8380' },
    { longName: 'Morrison/SW 3rd Ave MAX Station (#8381)', value: '8381' },
    { longName: 'Mall/SW 5th Ave MAX Station (#8382)', value: '8382' },
    { longName: 'Pioneer Square North MAX Station (#8383)', value: '8383' },
    { longName: 'Galleria/SW 10th Ave MAX Station (#8384)', value: '8384' },
    { longName: 'Providence Park MAX Station (#9757)', value: '9757' },
    { longName: 'Kings Hill/SW Salmon St MAX Station (#9820)', value: '9820' },
    {
      longName: 'Goose Hollow/SW Jefferson St MAX Station (#10117)',
      value: '10117'
    },
    { longName: 'Washington Park MAX Station (#10121)', value: '10121' },
    { longName: 'Sunset TC MAX Station (#9624)', value: '9624' },
    { longName: 'Beaverton TC MAX Station (#9821)', value: '9821' }
  ];

  YellowToExpoCenter: object = [
    { longName: 'PSU South/SW 6th & College MAX Stn (#10293)', value: '10293' },
    {
      longName: 'PSU Urban Center/SW 6th & Montgomery MAX Stn (#7774)',
      value: '7774'
    },
    { longName: 'SW 6th & Madison MAX Station (#13123)', value: '13123' },
    {
      longName: 'Pioneer Courthouse/SW 6th Ave MAX Stn (#7777)',
      value: '7777'
    },
    { longName: 'SW 6th & Pine MAX Station (#7787)', value: '7787' },
    { longName: 'NW 6th & Davis MAX Station (#9299)', value: '9299' },
    { longName: 'Union Station/NW 6th & Hoyt MAX Stn (#7763)', value: '7763' },
    {
      longName: 'Union Station/NW 5th & Glisan MAX Stn (#7601)',
      value: '7601'
    },
    {
      longName: 'Interstate/Rose Quarter MAX Station (#11508)',
      value: '11508'
    },
    { longName: 'Albina/Mississippi MAX Station (#11509)', value: '11509' },
    { longName: 'Overlook Park MAX Station (#11510)', value: '11510' },
    { longName: 'N Prescott St MAX Station (#11511)', value: '11511' },
    { longName: 'N Killingsworth St MAX Station (#11512)', value: '11512' },
    { longName: 'Rosa Parks MAX Station (#11513)', value: '11513' },
    { longName: 'N Lombard TC MAX Station (#11514)', value: '11514' },
    { longName: 'Kenton/N Denver Ave MAX Station (#11515)', value: '11515' },
    { longName: 'Delta Park/Vanport MAX Station (#11516)', value: '11516' },
    { longName: 'Expo Center MAX Station (#11498)', value: '11498' }
  ];

  YellowToCityCenter: object = [
    { longName: 'Expo Center MAX Station (#11498)', value: '11498' },
    { longName: 'Delta Park/Vanport MAX Station (#11499)', value: '11499' },
    { longName: 'Kenton/N Denver Ave MAX Station (#11500)', value: '11500' },
    { longName: 'N Lombard TC MAX Station (#11501)', value: '11501' },
    { longName: 'Rosa Parks MAX Station (#11502)', value: '11502' },
    { longName: 'N Killingsworth St MAX Station (#11503)', value: '11503' },
    { longName: 'N Prescott St MAX Station (#11504)', value: '11504' },
    { longName: 'Overlook Park MAX Station (#11505)', value: '11505' },
    { longName: 'Albina/Mississippi MAX Station (#11506)', value: '11506' },
    {
      longName: 'Interstate/Rose Quarter MAX Station (#11507)',
      value: '11507'
    },
    {
      longName: 'Union Station/NW 5th & Glisan MAX Stn (#7601)',
      value: '7601'
    },
    { longName: 'NW 5th & Couch MAX Station (#9303)', value: '9303' },
    { longName: 'SW 5th & Oak MAX Station (#7627)', value: '7627' },
    { longName: 'Pioneer Place/SW 5th Ave MAX Station (#7646)', value: '7646' },
    {
      longName: 'City Hall/SW 5th & Jefferson MAX Station (#7608)',
      value: '7608'
    },
    {
      longName: 'PSU Urban Center/SW 5th & Mill MAX Station (#7618)',
      value: '7618'
    }
  ];
}
