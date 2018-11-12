import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { InputTrimModule } from '../src';
import { By } from '@angular/platform-browser';
import { FormsModule, NgModel } from '@angular/forms';

/**
 * Defines the artificial test component
 */
@Component( {
  template: `
    <h2>TemplateDrivenFormComponent</h2>
    <label for="ex-trim">My input!</label>
    <input id="ex-trim" name="example" #exampleModel="ngModel" [(ngModel)]="example" value="" trim/>
    <span *ngIf="!exampleModel.touched">Example Not Touched</span>
    <span *ngIf="exampleModel.touched">Example Touched</span>
    <i *ngIf="exampleModel.pristine">Example Pristine</i>
    <i *ngIf="!exampleModel.pristine">Example Dirty</i>
  `
} )
class TemplateDrivenFormComponent {

  @ViewChild( 'exampleModel' ) exampleModel: NgModel;

  example: string = '';

}

describe( 'Tests: Template-Driven Form', () => {

  let componentInstance: TemplateDrivenFormComponent;

  let fixture: ComponentFixture<TemplateDrivenFormComponent>;

  let inputElement: HTMLInputElement;

  const value: string = 'Bob';
  const valueWithWhitespaces = 'Bob   ';

  beforeEach( () => {

    // create a component fixture
    TestBed.configureTestingModule( {
      imports     : [FormsModule, InputTrimModule],
      declarations: [TemplateDrivenFormComponent]
    } );

  } );

  describe( 'Initialization', () => {

    beforeEach( () => createComponentHelper() );

    it( 'should create component', () => expect( componentInstance ).toBeDefined() );

    it( 'should have title "TemplateDrivenFormComponent" ', () => {

      const el = fixture.debugElement.query( By.css( 'h2' ) ).nativeElement;

      expect( el.textContent ).toContain( 'TemplateDrivenFormComponent' );

    } );

    it( 'should have the empty input fields and models', () => {

      expect( inputElement.value ).toBe( '' );
      expect( componentInstance.example ).toBe( '' );

    } );

    it( 'should write value to the element when the NgModel\'s form control value is set', () => {

      componentInstance.exampleModel.control.setValue( value );
      expect( inputElement.value ).toBe( value );

      componentInstance.exampleModel.control.setValue( valueWithWhitespaces );
      expect( inputElement.value ).toBe( valueWithWhitespaces );

    } );

    it( `should return an empty string if value is undefined`, () => {

      componentInstance.exampleModel.control.setValue( undefined );

      inputElement.dispatchEvent( new Event( 'input' ) );

      fixture.detectChanges();

      expect( inputElement.value ).toBe( "" );

    } );

    it( `should return an empty string if value is null `, () => {

      componentInstance.exampleModel.control.setValue( null );

      inputElement.dispatchEvent( new Event( 'input' ) );

      fixture.detectChanges();

      expect( inputElement.value ).toBe( "" );

    } );

  } );

  describe( 'Directive without additional options.', () => {

    beforeEach( () => createComponentHelper() );

    it( 'should trim whitespaces from the end on the INPUT event', () => {

      componentInstance.exampleModel.control.setValue( valueWithWhitespaces );

      let el = fixture.debugElement.query( By.css( 'i' ) ).nativeElement;
      expect( el.textContent ).toContain( 'Example Pristine' );

      inputElement.dispatchEvent( new Event( 'input' ) );

      fixture.detectChanges();

      expect( inputElement.value ).toBe( value, 'Input value is not trimmed' );
      expect( componentInstance.example ).toBe( value, 'Model is not trimmed' );
      expect( componentInstance.example ).toBe( inputElement.value );

      el = fixture.debugElement.query( By.css( 'i' ) ).nativeElement;
      expect( el.textContent ).toContain( 'Example Dirty' );

    } );

    it( 'should keep pristine from the end on the BLUR event w/o changes', () => {

      componentInstance.exampleModel.control.setValue( value );

      fixture.detectChanges();

      let el = fixture.debugElement.query( By.css( 'span' ) ).nativeElement;
      expect( el.textContent ).toContain( 'Example Not Touched' );

      el = fixture.debugElement.query( By.css( 'i' ) ).nativeElement;
      expect( el.textContent ).toContain( 'Example Pristine' );

      inputElement.dispatchEvent( new Event( 'blur' ) );

      fixture.detectChanges();

      expect( inputElement.value ).toBe( value );
      expect( componentInstance.example ).toBe( value );
      expect( componentInstance.example ).toBe( inputElement.value );

      el = fixture.debugElement.query( By.css( 'span' ) ).nativeElement;
      expect( el.textContent ).toContain( 'Example Touched' );

      el = fixture.debugElement.query( By.css( 'i' ) ).nativeElement;
      expect( el.textContent ).toContain( 'Example Pristine' );

    } );

    it( 'should trim whitespaces from the end on the BLUR event', () => {

      componentInstance.exampleModel.control.setValue( valueWithWhitespaces );

      fixture.detectChanges();

      let el = fixture.debugElement.query( By.css( 'span' ) ).nativeElement;
      expect( el.textContent ).toContain( 'Example Not Touched' );

      el = fixture.debugElement.query( By.css( 'i' ) ).nativeElement;
      expect( el.textContent ).toContain( 'Example Pristine' );

      inputElement.dispatchEvent( new Event( 'blur' ) );

      fixture.detectChanges();

      expect( inputElement.value ).toBe( value, 'Input value is not trimmed' );
      expect( componentInstance.example ).toBe( value, 'Model is not trimmed' );
      expect( componentInstance.example ).toBe( inputElement.value );

      el = fixture.debugElement.query( By.css( 'span' ) ).nativeElement;
      expect( el.textContent ).toContain( 'Example Touched' );

      el = fixture.debugElement.query( By.css( 'i' ) ).nativeElement;
      expect( el.textContent ).toContain( 'Example Dirty' );

    } );

    it( 'should trim whitespaces of value of `email` input', () => {

      componentInstance.exampleModel.control.setValue( valueWithWhitespaces );
      inputElement.type = 'email';

      inputElement.dispatchEvent( new Event( 'input' ) );

      fixture.detectChanges();

      expect( inputElement.value ).toBe( value, 'Input value is not trimmed' );
      expect( componentInstance.example ).toBe( value, 'Model is not trimmed' );
      expect( componentInstance.example ).toBe( inputElement.value );

    } );

    it( 'should trim a value w/ whitespaces on two-way binding.', fakeAsync( () => {

      componentInstance.example = valueWithWhitespaces;

      fixture.detectChanges();
      tick();

      // tslint:disable-next-line: max-line-length
      expect( componentInstance.example ).toBe( inputElement.value, 'Value of model and input is the same' );

      inputElement.dispatchEvent( new Event( 'input' ) );

      expect( inputElement.value ).toBe( value, 'Input value is not trimmed' );
      expect( componentInstance.example ).toBe( value, 'Model is not trimmed' );

    } ) );

  } );

  describe( 'Directive with the blur option', () => {

    const template = `
      <input name="example" #exampleModel="ngModel" [(ngModel)]="example" value="" trim="blur"/>
      <span *ngIf="!exampleModel.touched">Example Not Touched</span>
      <span *ngIf="exampleModel.touched">Example Touched</span>
      <i *ngIf="exampleModel.pristine">Example Pristine</i>
      <i *ngIf="!exampleModel.pristine">Example Dirty</i>
    `;

    beforeEach( () => {
      TestBed.overrideTemplate( TemplateDrivenFormComponent, template );
      createComponentHelper();
    } );

    it( 'should not trim whitespaces from the end on the INPUT event ', () => {

      componentInstance.example = inputElement.value = valueWithWhitespaces;

      inputElement.dispatchEvent( new Event( 'input' ) );

      fixture.detectChanges();

      expect( inputElement.value ).not.toBe( value, 'Input value is trimmed' );
      expect( componentInstance.example ).toBe( valueWithWhitespaces, 'Model is trimmed' );

      expect( componentInstance.example ).toBe( inputElement.value );

    } );

    it( 'should keep pristine from the end on the BLUR event w/o changes', () => {

      componentInstance.exampleModel.control.setValue( value );

      fixture.detectChanges();

      let el = fixture.debugElement.query( By.css( 'span' ) ).nativeElement;
      expect( el.textContent ).toContain( 'Example Not Touched' );

      el = fixture.debugElement.query( By.css( 'i' ) ).nativeElement;
      expect( el.textContent ).toContain( 'Example Pristine' );

      inputElement.dispatchEvent( new Event( 'blur' ) );

      fixture.detectChanges();

      expect( inputElement.value ).toBe( value );
      expect( componentInstance.example ).toBe( value );
      expect( componentInstance.example ).toBe( inputElement.value );

      el = fixture.debugElement.query( By.css( 'span' ) ).nativeElement;
      expect( el.textContent ).toContain( 'Example Touched' );

      el = fixture.debugElement.query( By.css( 'i' ) ).nativeElement;
      expect( el.textContent ).toContain( 'Example Pristine' );

    } );

    it( 'should trim whitespaces from the end on the BLUR event', () => {

      componentInstance.exampleModel.control.setValue( valueWithWhitespaces );

      fixture.detectChanges();

      let el = fixture.debugElement.query( By.css( 'span' ) ).nativeElement;
      expect( el.textContent ).toContain( 'Example Not Touched' );

      el = fixture.debugElement.query( By.css( 'i' ) ).nativeElement;
      expect( el.textContent ).toContain( 'Example Pristine' );

      inputElement.dispatchEvent( new Event( 'blur' ) );

      fixture.detectChanges();

      expect( inputElement.value ).toBe( value, 'Input value is not trimmed' );
      expect( componentInstance.example ).toBe( value, 'Model is not trimmed' );
      expect( componentInstance.example ).toBe( inputElement.value );

      el = fixture.debugElement.query( By.css( 'span' ) ).nativeElement;
      expect( el.textContent ).toContain( 'Example Touched' );

      el = fixture.debugElement.query( By.css( 'i' ) ).nativeElement;
      expect( el.textContent ).toContain( 'Example Dirty' );

    } );

  } );

  function createComponentHelper(): void {

    fixture = TestBed.createComponent( TemplateDrivenFormComponent );

    // get the instance
    componentInstance = fixture.componentInstance;

    // get the element
    inputElement = fixture.debugElement.query( By.css( 'input' ) ).nativeElement;

    fixture.detectChanges();

  }

} );

