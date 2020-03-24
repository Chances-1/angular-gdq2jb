import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { MainPageComponent } from "./view/main-page.component";
import { AgGridModule } from "ag-grid-angular";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AgGridModule.withComponents([])
  ],
  declarations: [AppComponent, MainPageComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
