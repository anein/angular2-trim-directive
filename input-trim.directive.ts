import {
  Directive, HostListener, Renderer, forwardRef, ElementRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, DefaultValueAccessor } from '@angular/forms';

@Directive( {
  selector : '[trim]',
  providers: [ {
    provide    : NG_VALUE_ACCESSOR,
    useExisting: forwardRef( () => InputTrimDirective ),
    multi      : true
  } ]
} )
export class InputTrimDirective extends DefaultValueAccessor {

  private _el: HTMLInputElement;

  /**
   * Creates an instance of InputTrimDirective.
   *
   * @param {Renderer} _renderer
   * @param {ElementRef} _elementRef
   *
   * @memberOf InputTrimDirective
   */
  constructor ( _renderer: Renderer, _elementRef: ElementRef ) {

    super( _renderer, _elementRef );

    this._el = _elementRef.nativeElement;

  }

  /**
   * Updates the  value on the blur event.
   *
   */
  @HostListener( 'blur', [ '$event.target.value' ] )
  onBlur ( value: string ): void {
    this.trimValue( value );
  }

  /**
   * Updates the value on the input event.
   */
  @HostListener( 'input', [ '$event.target.value' ] )
  updateValue ( value: string ): void {
    this.trimValue( value );
  }

  /**
   * Write a value to the element.
   *
   * @param {string} value - new value.
   *
   * @memberOf InputTrimDirective
   */
  writeValue ( value: string ): void {
    super.writeValue( value );
  }

  /**
   * Trims the value and sets it to the element.
   *
   * @private
   * @param {string} value - value
   *
   * @memberOf InputTrimDirective
   */
  private trimValue( value: string ): void {

    value = value.trim();

    this._el.value = value;

    this.onChange( value );

  }
}
