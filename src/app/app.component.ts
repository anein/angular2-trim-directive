import { Component, Input } from '@angular/core';

@Component( {
  'selector'   : 'in-app',
  'templateUrl': './app.component.html',
  'styles'     : ['pre { background-color: whitesmoke;}']
} )
export class AppComponent {

  exampleInput: string = '';

  exampleTextarea: string = '';

  onInputSubmit(): void {
    console.log( `Input value: ${this.exampleInput}. Input length: ${this.exampleInput.length} ` );
  }

  onTextareaSubmit(): void {
    console.log( `Input value: ${this.exampleTextarea}. Input length: ${this.exampleTextarea.length} ` );
  }

  countLines(): number {
    return (this.exampleTextarea) ? this.exampleTextarea.split( '\n' ).length : 0;
  }

}
