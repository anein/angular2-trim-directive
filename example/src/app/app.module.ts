import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { InputTrimDirective } from '../../../src/input-trim.directive';

@NgModule( {
  imports     : [BrowserModule, FormsModule],
  declarations: [
    AppComponent,
    InputTrimDirective
  ],
  bootstrap   : [AppComponent]
} )
export class AppModule {

}

