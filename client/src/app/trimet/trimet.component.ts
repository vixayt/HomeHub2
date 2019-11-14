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
      longName: 'MAX Red Line to Porland International Airport'
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
          this.errorMessage = 'Please add a new line';
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
}

/*
MAX Blue Line To Gresham          
<option value="9848">Hatfield Government Center MAX Station (#9848)</option><option value="9843">Tuality Hospital/SE 8th Ave MAX Station (#9843)</option>
<option value="9841">Washington/SE 12th Ave MAX Station (#9841)</option>
<option value="9846">Hillsboro Central/SE 3rd TC MAX Station (#9846)</option><option value="9838">Fair Complex/Hillsboro Airport MAX Stn (#9838)</option>
<option value="9839">Hawthorn Farm MAX Station (#9839)</option>
<option value="9835">Orenco MAX Station (#9835)</option>
<option value="9834">Quatama MAX Station (#9834)</option>
<option value="9831">Willow Creek/SW 185th Ave TC MAX Station (#9831)</option>
<option value="9830">Elmonica/SW 170th Ave MAX Station (#9830)</option>
<option value="9828">Merlo Rd/SW 158th Ave MAX Station (#9828)</option>
<option value="9822">Beaverton Creek MAX Station (#9822)</option>
<option value="9826">Millikan Way MAX Station (#9826)</option>
<option value="9824">Beaverton Central MAX Station (#9824)</option>
<option value="9821">Beaverton TC MAX Station (#9821)</option>
<option value="9969">Sunset TC MAX Station (#9969)</option>
<option value="10120">Washington Park MAX Station (#10120)</option>
<option value="10118">Goose Hollow/SW Jefferson St MAX Station (#10118)</option>
<option value="9759">Kings Hill/SW Salmon St MAX Station (#9759)</option>
<option value="9758">Providence Park MAX Station (#9758)</option>
<option value="8333">Library/SW 9th Ave MAX Station (#8333)</option>
<option value="8334">Pioneer Square South MAX Station (#8334)</option>
<option value="8335">Mall/SW 4th Ave MAX Station (#8335)</option>
<option value="8336">Yamhill District MAX Station (#8336)</option>
<option value="8337">Oak/ SW 1st Ave MAX Station (#8337)</option>
<option value="8338">Skidmore Fountain MAX Station (#8338)</option>
<option value="8339">Old Town/Chinatown MAX Station (#8339)</option>
<option value="8340">Rose Quarter TC MAX Station (#8340)</option>
<option value="8341">Convention Center MAX Station (#8341)</option>
<option value="8342">NE 7th Ave MAX Station (#8342)</option>
<option value="8343">Lloyd Center/NE 11th Ave MAX Station (#8343)</option>
<option value="8344">Hollywood/NE 42nd Ave TC MAX Station (#8344)</option>
<option value="8345">NE 60th Ave MAX Station (#8345)</option>
<option value="8346">NE 82nd Ave MAX Station (#8346)</option>
<option value="8347">Gateway/NE 99th Ave TC MAX Station (#8347)</option>
<option value="8348">E 102nd Ave MAX Station (#8348)</option>
<option value="8349">E 122nd Ave MAX Station (#8349)</option>
<option value="8350">E 148th Ave MAX Station (#8350)</option>
<option value="8351">E 162nd Ave MAX Station (#8351)</option>
<option value="8352">E 172nd Ave MAX Station (#8352)</option>
<option value="8353">E 181st Ave MAX Station (#8353)</option>
<option value="8354">Rockwood/E 188th Ave MAX Station (#8354)</option>
<option value="8355">Ruby Junction/E 197th Ave MAX Station (#8355)</option>
<option value="13450">Civic Drive MAX Station (#13450)</option>
<option value="8356">Gresham City Hall MAX Station (#8356)</option>
<option value="8357">Gresham Central TC MAX Station (#8357)</option>
<option value="8359">Cleveland Ave MAX Station (#8359)</option>

MAX Blue Line To Hillsboro
<option value="8359">Cleveland Ave MAX Station (#8359)</option>
<option value="8360">Gresham Central TC MAX Station (#8360)</option>
<option value="8361">Gresham City Hall MAX Station (#8361)</option>
<option value="13449">Civic Drive MAX Station (#13449)</option>
<option value="8362">Ruby Junction/E 197th Ave MAX Station (#8362)</option>
<option value="8363">Rockwood/E 188th Ave MAX Station (#8363)</option>
<option value="8364">E 181st Ave MAX Station (#8364)</option>
<option value="8365">E 172nd Ave MAX Station (#8365)</option>
<option value="8366">E 162nd Ave MAX Station (#8366)</option>
<option value="8367">E 148th Ave MAX Station (#8367)</option>
<option value="8368">E 122nd Ave MAX Station (#8368)</option>
<option value="8369">E 102nd Ave MAX Station (#8369)</option>
<option value="8370">Gateway/NE 99th Ave TC MAX Station (#8370)</option>
<option value="8371">NE 82nd Ave MAX Station (#8371)</option>
<option value="8372">NE 60th Ave MAX Station (#8372)</option>
<option value="8373">Hollywood/NE 42nd Ave TC MAX Station (#8373)</option>
<option value="8374">Lloyd Center/NE 11th Ave MAX Station (#8374)</option>
<option value="8375">NE 7th Ave MAX Station (#8375)</option>
<option value="8376">Convention Center MAX Station (#8376)</option>
<option value="8377">Rose Quarter TC MAX Station (#8377)</option>
<option value="8378">Old Town/Chinatown MAX Station (#8378)</option>
<option value="8379">Skidmore Fountain MAX Station (#8379)</option>
<option value="8380">Oak/ SW 1st Ave MAX Station (#8380)</option>
<option value="8381">Morrison/SW 3rd Ave MAX Station (#8381)</option>
<option value="8382">Mall/SW 5th Ave MAX Station (#8382)</option>
<option value="8383">Pioneer Square North MAX Station (#8383)</option>
<option value="8384">Galleria/SW 10th Ave MAX Station (#8384)</option>
<option value="9757">Providence Park MAX Station (#9757)</option>
<option value="9820">Kings Hill/SW Salmon St MAX Station (#9820)</option>
<option value="10117">Goose Hollow/SW Jefferson St MAX Station (#10117)</option>
<option value="10121">Washington Park MAX Station (#10121)</option>
<option value="9624">Sunset TC MAX Station (#9624)</option>
<option value="9818">Beaverton TC MAX Station (#9818)</option>
<option value="9823">Beaverton Central MAX Station (#9823)</option>
<option value="9825">Millikan Way MAX Station (#9825)</option>
<option value="9819">Beaverton Creek MAX Station (#9819)</option>
<option value="9827">Merlo Rd/SW 158th Ave MAX Station (#9827)</option>
<option value="9829">Elmonica/SW 170th Ave MAX Station (#9829)</option>
<option value="9832">Willow Creek/SW 185th Ave TC MAX Station (#9832)</option>
<option value="9833">Quatama MAX Station (#9833)</option>
<option value="9836">Orenco MAX Station (#9836)</option>
<option value="9840">Hawthorn Farm MAX Station (#9840)</option>
<option value="9837">Fair Complex/Hillsboro Airport MAX Stn (#9837)</option>
<option value="9842">Washington/SE 12th Ave MAX Station (#9842)</option>
<option value="9844">Tuality Hospital/SE 8th Ave MAX Station (#9844)</option>
<option value="9845">Hillsboro Central/SE 3rd TC MAX Station (#9845)</option>
<option value="9848">Hatfield Government Center MAX Station (#9848)</option>

MAX Green Line to Clackamas Town Center
<option value="10293">PSU South/SW 6th &amp; College MAX Stn (#10293)</option>
<option value="7774">PSU Urban Center/SW 6th &amp; Montgomery MAX Stn (#7774)</option>
<option value="13123">SW 6th &amp; Madison MAX Station (#13123)</option>
<option value="7777">Pioneer Courthouse/SW 6th Ave MAX Stn (#7777)</option>
<option value="7787">SW 6th &amp; Pine MAX Station (#7787)</option>
<option value="9299">NW 6th &amp; Davis MAX Station (#9299)</option>
<option value="7763">Union Station/NW 6th &amp; Hoyt MAX Stn (#7763)</option>
<option value="8340">Rose Quarter TC MAX Station (#8340)</option>
<option value="8341">Convention Center MAX Station (#8341)</option>
<option value="8342">NE 7th Ave MAX Station (#8342)</option>
<option value="8343">Lloyd Center/NE 11th Ave MAX Station (#8343)</option>
<option value="8344">Hollywood/NE 42nd Ave TC MAX Station (#8344)</option>
<option value="8345">NE 60th Ave MAX Station (#8345)</option>
<option value="8346">NE 82nd Ave MAX Station (#8346)</option>
<option value="8347">Gateway/NE 99th Ave TC MAX Station (#8347)</option>
<option value="13124">SE Main St MAX Station (#13124)</option>
<option value="13125">SE Division St MAX Station (#13125)</option>
<option value="13126">SE Powell Blvd MAX Station (#13126)</option>
<option value="13127">SE Holgate Blvd MAX Station (#13127)</option>
<option value="13128">Lents/SE Foster Rd MAX Station (#13128)</option>
<option value="13129">SE Flavel St MAX Station (#13129)</option>
<option value="13130">SE Fuller Rd MAX Station (#13130)</option>
<option value="13132">Clackamas Town Center TC MAX Station (#13132)</option>

MAX Green Line to Portland City Center/PSU
<option value="13132">Clackamas Town Center TC MAX Station (#13132)</option>
<option value="13133">SE Fuller Rd MAX Station (#13133)</option>
<option value="13134">SE Flavel St MAX Station (#13134)</option>
<option value="13135">Lents/SE Foster Rd MAX Station (#13135)</option>
<option value="13136">SE Holgate Blvd MAX Station (#13136)</option>
<option value="13137">SE Powell Blvd MAX Station (#13137)</option>
<option value="13138">SE Division St MAX Station (#13138)</option>
<option value="13139">SE Main St MAX Station (#13139)</option>
<option value="8370">Gateway/NE 99th Ave TC MAX Station (#8370)</option>
<option value="8371">NE 82nd Ave MAX Station (#8371)</option>
<option value="8372">NE 60th Ave MAX Station (#8372)</option>
<option value="8373">Hollywood/NE 42nd Ave TC MAX Station (#8373)</option>
<option value="8374">Lloyd Center/NE 11th Ave MAX Station (#8374)</option>
<option value="8375">NE 7th Ave MAX Station (#8375)</option>
<option value="8376">Convention Center MAX Station (#8376)</option>
<option value="8377">Rose Quarter TC MAX Station (#8377)</option>
<option value="7601">Union Station/NW 5th &amp; Glisan MAX Stn (#7601)</option>
<option value="9303">NW 5th &amp; Couch MAX Station (#9303)</option>
<option value="7627">SW 5th &amp; Oak MAX Station (#7627)</option>
<option value="7646">Pioneer Place/SW 5th Ave MAX Station (#7646)</option>
<option value="7608">City Hall/SW 5th &amp; Jefferson MAX Station (#7608)</option>
<option value="7618">PSU Urban Center/SW 5th &amp; Mill MAX Station (#7618)</option>

MAX Orange Line To Portland City Center
<option value="13720">SE Park Ave MAX Station (#13720)</option>
<option value="13721">Milwaukie/Main St MAX Station (#13721)</option>
<option value="13722">SE Tacoma/Johnson Creek MAX Station (#13722)</option>
<option value="13723">SE Bybee Blvd MAX Station (#13723)</option>
<option value="13724">SE 17th Ave &amp; Holgate Blvd MAX Station (#13724)</option>
<option value="13725">SE 17th Ave &amp; Rhine St MAX Station (#13725)</option>
<option value="13726">Clinton St/SE 12th Ave MAX Station (#13726)</option>
<option value="13727">OMSI/SE Water MAX Station (#13727)</option>
<option value="13728">South Waterfront/SW Moody MAX Station (#13728)</option>
<option value="13729">Lincoln St/SW 3rd Ave MAX Station (#13729)</option>
<option value="10293">PSU South/SW 6th &amp; College MAX Stn (#10293)</option>

MAX Orange Line to Milwaukie
<option value="7601">Union Station/NW 5th &amp; Glisan MAX Stn (#7601)</option>
<option value="9303">NW 5th &amp; Couch MAX Station (#9303)</option>
<option value="7627">SW 5th &amp; Oak MAX Station (#7627)</option>
<option value="7646">Pioneer Place/SW 5th Ave MAX Station (#7646)</option>
<option value="7608">City Hall/SW 5th &amp; Jefferson MAX Station (#7608)</option>
<option value="7618">PSU Urban Center/SW 5th &amp; Mill MAX Station (#7618)</option>
<option value="7606">PSU South/SW 5th &amp; Jackson MAX Stn (#7606)</option>
<option value="13710">Lincoln St/SW 3rd Ave MAX Station (#13710)</option>
<option value="13711">South Waterfront/SW Moody MAX Station (#13711)</option>
<option value="13712">OMSI/SE Water MAX Station (#13712)</option>
<option value="13713">Clinton St/SE 12th Ave MAX Station (#13713)</option>
<option value="13714">SE 17th Ave &amp; Rhine St MAX Station (#13714)</option>
<option value="13715">SE 17th Ave &amp; Holgate Blvd MAX Station (#13715)</option>
<option value="13716">SE Bybee Blvd MAX Station (#13716)</option>
<option value="13717">SE Tacoma/Johnson Creek MAX Station (#13717)</option>
<option value="13718">Milwaukie/Main St MAX Station (#13718)</option>
<option value="13720">SE Park Ave MAX Station (#13720)</option>

MAX Red Line to Porland International Airport
<option value="9821">Beaverton TC MAX Station (#9821)</option>
<option value="9969">Sunset TC MAX Station (#9969)</option>
<option value="10120">Washington Park MAX Station (#10120)</option>
<option value="10118">Goose Hollow/SW Jefferson St MAX Station (#10118)</option>
<option value="9759">Kings Hill/SW Salmon St MAX Station (#9759)</option>
<option value="9758">Providence Park MAX Station (#9758)</option>
<option value="8333">Library/SW 9th Ave MAX Station (#8333)</option>
<option value="8334">Pioneer Square South MAX Station (#8334)</option>
<option value="8335">Mall/SW 4th Ave MAX Station (#8335)</option>
<option value="8336">Yamhill District MAX Station (#8336)</option>
<option value="8337">Oak/ SW 1st Ave MAX Station (#8337)</option>
<option value="8338">Skidmore Fountain MAX Station (#8338)</option>
<option value="8339">Old Town/Chinatown MAX Station (#8339)</option>
<option value="8340">Rose Quarter TC MAX Station (#8340)</option>
<option value="8341">Convention Center MAX Station (#8341)</option>
<option value="8342">NE 7th Ave MAX Station (#8342)</option>
<option value="8343">Lloyd Center/NE 11th Ave MAX Station (#8343)</option>
<option value="8344">Hollywood/NE 42nd Ave TC MAX Station (#8344)</option>
<option value="8345">NE 60th Ave MAX Station (#8345)</option>
<option value="8346">NE 82nd Ave MAX Station (#8346)</option>
<option value="8347">Gateway/NE 99th Ave TC MAX Station (#8347)</option>
<option value="10572">Parkrose/Sumner TC MAX Station (#10572)</option>
<option value="10574">Cascades MAX Station (#10574)</option>
<option value="10576">Mt Hood Ave MAX Station (#10576)</option>
<option value="10579">Portland Int'l Airport MAX Station (#10579)</option>

MAX Red Line to Beaverton Transit Center
<option value="10579">Portland Int'l Airport MAX Station (#10579)</option>
<option value="10577">Mt Hood Ave MAX Station (#10577)</option>
<option value="10575">Cascades MAX Station (#10575)</option>
<option value="10573">Parkrose/Sumner TC MAX Station (#10573)</option>
<option value="8370">Gateway/NE 99th Ave TC MAX Station (#8370)</option>
<option value="8371">NE 82nd Ave MAX Station (#8371)</option>
<option value="8372">NE 60th Ave MAX Station (#8372)</option>
<option value="8373">Hollywood/NE 42nd Ave TC MAX Station (#8373)</option>
<option value="8374">Lloyd Center/NE 11th Ave MAX Station (#8374)</option>
<option value="8375">NE 7th Ave MAX Station (#8375)</option>
<option value="8376">Convention Center MAX Station (#8376)</option>
<option value="8377">Rose Quarter TC MAX Station (#8377)</option>
<option value="8378">Old Town/Chinatown MAX Station (#8378)</option>
<option value="8379">Skidmore Fountain MAX Station (#8379)</option>
<option value="8380">Oak/ SW 1st Ave MAX Station (#8380)</option>
<option value="8381">Morrison/SW 3rd Ave MAX Station (#8381)</option>
<option value="8382">Mall/SW 5th Ave MAX Station (#8382)</option>
<option value="8383">Pioneer Square North MAX Station (#8383)</option>
<option value="8384">Galleria/SW 10th Ave MAX Station (#8384)</option>
<option value="9757">Providence Park MAX Station (#9757)</option>
<option value="9820">Kings Hill/SW Salmon St MAX Station (#9820)</option>
<option value="10117">Goose Hollow/SW Jefferson St MAX Station (#10117)</option>
<option value="10121">Washington Park MAX Station (#10121)</option>
<option value="9624">Sunset TC MAX Station (#9624)</option>
<option value="9821">Beaverton TC MAX Station (#9821)</option>

MAX Yellow Line to Expo Center
<option value="10293">PSU South/SW 6th &amp; College MAX Stn (#10293)</option>
<option value="7774">PSU Urban Center/SW 6th &amp; Montgomery MAX Stn (#7774)</option>
<option value="13123">SW 6th &amp; Madison MAX Station (#13123)</option>
<option value="7777">Pioneer Courthouse/SW 6th Ave MAX Stn (#7777)</option>
<option value="7787">SW 6th &amp; Pine MAX Station (#7787)</option>
<option value="9299">NW 6th &amp; Davis MAX Station (#9299)</option>
<option value="7763">Union Station/NW 6th &amp; Hoyt MAX Stn (#7763)</option>
<option value="7601">Union Station/NW 5th &amp; Glisan MAX Stn (#7601)</option>
<option value="11508">Interstate/Rose Quarter MAX Station (#11508)</option>
<option value="11509">Albina/Mississippi MAX Station (#11509)</option>
<option value="11510">Overlook Park MAX Station (#11510)</option>
<option value="11511">N Prescott St MAX Station (#11511)</option>
<option value="11512">N Killingsworth St MAX Station (#11512)</option>
<option value="11513">Rosa Parks MAX Station (#11513)</option>
<option value="11514">N Lombard TC MAX Station (#11514)</option>
<option value="11515">Kenton/N Denver Ave MAX Station (#11515)</option>
<option value="11516">Delta Park/Vanport MAX Station (#11516)</option>
<option value="11498">Expo Center MAX Station (#11498)</option>

MAX Yellow Line to Portland City Center
<option value="11498">Expo Center MAX Station (#11498)</option>
<option value="11499">Delta Park/Vanport MAX Station (#11499)</option>
<option value="11500">Kenton/N Denver Ave MAX Station (#11500)</option>
<option value="11501">N Lombard TC MAX Station (#11501)</option>
<option value="11502">Rosa Parks MAX Station (#11502)</option>
<option value="11503">N Killingsworth St MAX Station (#11503)</option>
<option value="11504">N Prescott St MAX Station (#11504)</option>
<option value="11505">Overlook Park MAX Station (#11505)</option>
<option value="11506">Albina/Mississippi MAX Station (#11506)</option>
<option value="11507">Interstate/Rose Quarter MAX Station (#11507)</option>
<option value="7601">Union Station/NW 5th &amp; Glisan MAX Stn (#7601)</option>
<option value="9303">NW 5th &amp; Couch MAX Station (#9303)</option>
<option value="7627">SW 5th &amp; Oak MAX Station (#7627)</option>
<option value="7646">Pioneer Place/SW 5th Ave MAX Station (#7646)</option>
<option value="7608">City Hall/SW 5th &amp; Jefferson MAX Station (#7608)</option>
<option value="7618">PSU Urban Center/SW 5th &amp; Mill MAX Station (#7618)</option>
*/
