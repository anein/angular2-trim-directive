import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTrimModule } from '../../../src/';

@NgModule( {
  imports     : [
    BrowserModule,
    FormsModule,
    InputTrimModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap   : [AppComponent]
} )
export class AppModule {

}

