import { Component, Input, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Observable, forkJoin }  from 'rxjs';
import * as Plotly from 'plotly.js';

@Component({
  selector: 'main-page',
  templateUrl: 'main-page.component.html',
  styleUrls: ['main-page.component.css'],
  providers: [DatePipe, HttpClient]
})
export class MainPageComponent  {

  private gridApi;
  private gridColumnApi;

  table_columnDefs = [];
  table_rowData = [];
  table_defaultColDef;

  url_getWeatherData="https://api.data.gov.sg/v1/environment/4-day-weather-forecast";

  constructor(private http: HttpClient,
            private datePipe: DatePipe){}

    
  async ngOnInit() {


    this.table_columnDefs = [ 
      // date
      {
        field: 'date',
        sort: 'asc'
      },
      // temperature
      {
        headerName:'Temperature',
        children:[
          {
            headerName: 'High',
            field:'tempHigh'
          },
          {
            headerName: 'Low',
            field:'tempLow'
          }
        ]
      },
      // Humidity
      {
        headerName:'Humidity',
        children:[
          {
            headerName: 'High',
            field:'humiHigh'
          },
          {
            headerName: 'Low',
            field:'humiLow'
          }
        ]
      }
    ];
    this.getWeatherData();


    this.table_defaultColDef = {
      sortable: true,
      filter: true,
    };
  }

  ngAfterViewInit(){
  }

  getWeatherData(dateInput?:Date){

    let array_table_rowData = new Array();
    let date = new Date();
    if(dateInput){
      date = date;
    }
    date.setDate(date.getDate() - 28);
    console.log(date);

    let array_url = [];
    for(let i = 1; i<7 ; i++){
      let url_dte = this.url_getWeatherData + "?date=" + this.datePipe.transform(date.setDate(date.getDate() + 4), "yyyy-MM-dd");    
      array_url.push(url_dte);
    }

    // create array of observables
    const observableArray: Array<Observable<any>> = array_url.map((url) => this.http.get(url));

    // merge all observables into one
    forkJoin(observableArray).subscribe((data: Array<any>) => {

        // process every http response
        data.forEach((response: any) => {
            const forecasts_pull = response.items[0].forecasts;

            forecasts_pull.forEach((forecast: any) => {
                this.table_rowData.push({
                    date: forecast.date,   
                    tempHigh: forecast.temperature.high,   
                    tempLow: forecast.temperature.low,   
                    humiHigh: forecast.relative_humidity.high,   
                    humiLow: forecast.relative_humidity.low
                })
            })
        })

        this.gridApi.setRowData(this.table_rowData);
     }); 
   
  }
  onGridReady(params: any) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
      this.gridApi.sizeColumnsToFit();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.gridApi.sizeColumnsToFit();
  }
}