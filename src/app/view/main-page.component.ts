import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

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
  array_rowData = [];
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
            field:'tempHigh',
            width:120
          },
          {
            headerName: 'Low',
            field:'tempLow',
            width:120
          }
        ]
      },
      // Humidity
      {
        headerName:'Humidity',
        children:[
          {
            headerName: 'High',
            field:'humiHigh',
            width:120
          },
          {
            headerName: 'Low',
            field:'humiLow',
            width:120
          }
        ]
      }
    ];
    this.table_rowData = [];
    this.table_rowData.push({});

    this.table_defaultColDef = {
      sortable: true,
      filter: true,
    };
  }

  ngAfterViewInit(){
  }

  getWeatherData(date?:Date){

    let array_table_rowData = new Array();
    let dte1 = new Date();
    if(date){
      dte1 = date;
    }
    dte1.setDate(dte1.getDate() - 28);

    let url_dte1 = this.url_getWeatherData + "?date=" + this.datePipe.transform(dte1, "yyyy-MM-dd");
    let array_url = [url_dte1];

    for(let i=0; i < array_url.length; i++){
      
        this.http.get(array_url[i]).subscribe(data => {
            
            let forecasts_pull = data.items[0].forecasts;
            for(let j=0; j < forecasts_pull.length; j++){
              let forecast = forecasts_pull[j]
              console.log(array_url[i]);
              this.array_rowData.push(
                {
                  date:forecast.date,
                  tempHigh:forecast.temperature.high,
                  tempLow:forecast.temperature.low,
                  humiHigh:forecast.relative_humidity.high,
                  humiLow:forecast.relative_humidity.low
                });
            }
            
        });
    }
  }
  async onGridReady(params){
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    await this.getWeatherData();

    console.log(this.array_rowData);

    this.gridApi.setRowData(this.array_rowData);
  }
}