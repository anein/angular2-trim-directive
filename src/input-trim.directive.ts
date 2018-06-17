import {
  Directive, ElementRef, HostListener, Inject, Input, Optional,
  Renderer2
} from '@angular/core';
import { COMPOSITION_BUFFER_MODE, DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive( {
  selector : 'input[trim], textarea[trim]',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: InputTrimDirective, multi: true }]

} )
export class InputTrimDirective extends DefaultValueAccessor {

  /**
   * Keep the type of input element in a cache.
   *
   * @type {string}
   * @private
   */
  private _type: string = 'text';

  /**
   * Keep the value of input element in a cache.
   *
   * @type {string}
   * @private
   */
  private _value: string;

  // Source services to modify elements.
  private _sourceRenderer: Renderer2;
  private _sourceElementRef: ElementRef;

  // Get a value of the trim attribute if it was set.
  @Input() trim: string;

  // Get the element type
  @Input()
  get type(): string {
    return this._type;
  }

  set type( value: string ) {
    this._type = value || 'text';
  }

  /**
   * Get the cached value for comparison.
   *
   */
  get value() {
    return this._value;
  }

  /**
   * Set a new value to the field and model.
   *
   */
  set value( val: any ) {
    // update element
    this.writeValue( val );

    if (val !== this.value) {

      // Cache the new value first
      this._value = val;

      // update model
      this.onChange( val );

    }

  }

  /**
   * Updates the value on the blur event.
   */
  @HostListener( 'blur', ['$event.type', '$event.target.value'] )
  onBlur( event: string, value: string ): void {

    // update value if only changed
    // FIX: https://github.com/anein/angular2-trim-directive/issues/17
    if (value.trim() !== this.value) {
      this.updateValue( event, value );
    }

    this.onTouched();
  }

  /**
   * Updates the value on the input event.
   */
  @HostListener( 'input', ['$event.type', '$event.target.value'] )
  onInput( event: string, value: string ): void {
    this.updateValue( event, value );
  }

  constructor( @Inject( Renderer2 ) renderer: Renderer2,
               @Inject( ElementRef ) elementRef: ElementRef,
               @Optional() @Inject( COMPOSITION_BUFFER_MODE ) compositionMode: boolean ) {
    super( renderer, elementRef, compositionMode );

    this._sourceRenderer = renderer;
    this._sourceElementRef = elementRef;
  }

  /**
   * Writes a new value to the element based on the type of input element.
   *
   * FIX: https://github.com/anein/angular2-trim-directive/issues/9
   *
   * @param {any} value - new value
   */
  public writeValue( value: any ): void {

    if (!this._value) {
      this._value = value;
    }

    this._sourceRenderer.setProperty( this._sourceElementRef.nativeElement, 'value', value );

    // a dirty trick (or magic) goes here:
    // it updates the element value if `setProperty` doesn't set it for some reason.
    if (this._type !== 'text') {
      this._sourceRenderer.setAttribute( this._sourceElementRef.nativeElement, 'value', value );
    }

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
