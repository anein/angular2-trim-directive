import {
  Directive, EventEmitter, HostListener, Input, Output
} from '@angular/core';
import { DefaultValueAccessor } from '@angular/forms';

@Directive( {
  selector: 'input[trim]',
} )
export class InputTrimDirective extends DefaultValueAccessor {

  // Get a value of the trim attribute if it was set.
  @Input() trim: string;

  // this property is necessary to update the model.
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

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

    // check if the user has set an optional attribute.
    if (this.trim !== '' && event !== this.trim) {
      return;
    }

    // trim! Uhahahaha!
    value = value.trim();

    // update model
    this.ngModelChange.emit( value );
    // update element
    this.writeValue( value );
  }

}
