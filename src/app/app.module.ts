import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule  //Hay que registar el HttpClientModule para que funcione la página.
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
