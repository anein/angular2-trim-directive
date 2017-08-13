import {
  Directive, HostListener
} from '@angular/core';
import { DefaultValueAccessor } from '@angular/forms';

@Directive( {
  selector: '[trim]'
} )
export class InputTrimDirective extends DefaultValueAccessor {

  /**
   * Updates the value on the blur event.
   *
   */
  @HostListener( 'blur', ['$event.target.value'] )
  onBlur( value: string ): void {
    super.writeValue( value.trim() );
  }

  /**
   * Updates the value on the input event.
   */
  @HostListener( 'input', ['$event.target.value'] )
  onInput( value: string ): void {
    super.writeValue( value.trim() );
  }

}
