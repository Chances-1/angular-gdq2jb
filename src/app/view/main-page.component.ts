import { Component, Input } from '@angular/core';

@Component({
  selector: 'main-page',
  templateUrl: 'main-page.component.html',
  styleUrls: ['main-page.component.css']
})
export class MainPageComponent  {
  
    columnDefs = [];

    rowData = [];

    
  ngOnInit() {
    this.columnDefs = [ 
        {field: 'date' },
        {field: 'temperature' },
        {field: 'humidity'}
    ];
    this.rowData = [
        { date: 'Toyota', model: 'Celica', price: 35000 },
        { date: 'Ford', model: 'Mondeo', price: 32000 },
        { date: 'Porsche', model: 'Boxter', price: 72000 }
    ];
  }
}
