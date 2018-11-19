import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component( {
  'selector'     : 'in-app',
  'templateUrl'  : './app.component.html',
  'styles'       : ['pre { background-color: whitesmoke;} small {color: #AAA}'],
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class AppComponent {

  trigger: FormControl;

  exampleForm: FormGroup;

  exampleFormInfo = {};

  undefined_Model: string | undefined;

  constructor( @Inject( FormBuilder ) private fb: FormBuilder ) {
    this.trigger = this.fb.control( 'input' );

    this.exampleForm = this.fb.group( {

      'text'          : ["Booobbb    "],
      'text_undefined': [undefined],
      'text_autofill' : [undefined],
      'email'         : ['', [Validators.email]],
      'number'        : ['', []],
      'url'           : ['', []],
      'textarea'      : ['', [Validators.maxLength( 10 )]]

    } );

    this.updateStates();

  }

  ngOnInit() {
    this.exampleForm.controls.text_undefined.setValue( undefined );
  }

  /**
   * ngFor Helper
   */
  getKeys( obj: Object ): Array<string> {

    this.updateStates();

    return Object.keys( obj );
  }

  /**
   * Can be simplified
   */
  updateStates() {

    const fields = ['status', 'dirty', 'touched'];

    for (let item in this.exampleForm.controls) {
      this.exampleFormInfo[item] = {};
      for (let field of fields) {
        this.exampleFormInfo[item][field] = this.exampleForm.controls[item][field];
      }

    }

  }

  onTemplateFormSubmit(): void {
    console.log( this.undefined_Model );
  }

  onSubmit(): void {
    console.log( this.exampleForm.value );

  }

}
