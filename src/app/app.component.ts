import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component( {
  'selector'   : 'in-app',
  'templateUrl': './app.component.html'
} )
export class AppComponent {

  example: string = '';

  onSubmit(): void {
    console.log( this.example );
    console.log( this.example.length );
  }

}
