import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { InputTrimDirective } from '../../../input-trim.directive';
import { FormsModule } from '@angular/forms';

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

