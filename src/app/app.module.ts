import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTrimModule } from 'ng2-trim-directive';

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

