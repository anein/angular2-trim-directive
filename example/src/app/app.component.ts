import {
  ChangeDetectionStrategy, Component, Inject, Input,
  ViewEncapsulation
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component( {
  'selector'     : 'in-app',
  'templateUrl'  : './app.component.html',
  'styles'       : ['pre { background-color: whitesmoke;}'],
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class AppComponent {

  exampleForm: FormGroup;

  constructor( @Inject( FormBuilder ) private fb: FormBuilder ) {

    this.exampleForm = this.fb.group( {

      'text'    : ['', Validators.required],
      'email'   : ['', [Validators.required, Validators.email]],
      'number'  : ['', [Validators.required]],
      'url'     : ['', [Validators.required]],
      'textarea': ['', [Validators.required, Validators.maxLength( 10 )]]

    } );

  }

  onSubmit(): void {
    //
  }

}
