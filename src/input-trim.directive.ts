import {
  Directive, HostListener, Input
} from '@angular/core';
import {
  DefaultValueAccessor, NG_VALUE_ACCESSOR
} from '@angular/forms';

@Directive( {
  selector : 'input[trim], textarea[trim]',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: InputTrimDirective, multi: true }
  ],

} )
export class InputTrimDirective extends DefaultValueAccessor {

  // set a new value to the field and model.
  private set value( val: any ) {

    // update element
    this.writeValue( val );

    // update model
    this.onChange( val );

  }

  // Get a value of the trim attribute if it was set.
  @Input() trim: string;

  /**
   * Updates the value on the blur event.
   */
  @HostListener( 'blur', ['$event.type', '$event.target.value'] )
  onBlur( event: string, value: string ): void {
    this.updateValue( event, value );
  }

  /**
   * Updates the value on the input event.
   */
  @HostListener( 'input', ['$event.type', '$event.target.value'] )
  onInput( event: string, value: string ): void {
    this.updateValue( event, value );
  }

  /**
   * Trims an input value, and sets it to the model and element.
   *
   * @param {string} value - input value
   * @param {string} event - input event
   */
  private updateValue( event: string, value: string ): void {

    // check if the user has set an optional attribute. Trimmmm!!! Uhahahaha!
    this.value = (this.trim !== '' && event !== this.trim) ? value : value.trim();

  }

}
