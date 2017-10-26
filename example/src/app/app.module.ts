import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { InputTrimModule } from '../../../src/';

@NgModule( {
  imports     : [
    BrowserModule,
    FormsModule,
    InputTrimModule,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap   : [AppComponent]
} )
export class AppModule {

}

