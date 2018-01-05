import { TestBed, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { Component } from '@angular/core';
import { InputTrimModule } from '../src';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

/**
 * Defines the artificial test component
 */
@Component( {
  template: `
    <h2>TemplateDrivenFormComponent</h2>
    <label for="ex-trim">My input!</label>
    <input id="ex-trim" name="example" [(ngModel)]="example" value="" trim/>
  `
} )
class TemplateDrivenFormComponent {

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

  } );

  describe( 'Directive without additional options.', () => {

    beforeEach( () => createComponentHelper() );

    it( 'should trim whitespaces from the end on the INPUT event', () => {

      inputElement.value = valueWithWhitespaces;

      inputElement.dispatchEvent( new Event( 'input' ) );

      fixture.detectChanges();

      expect( inputElement.value ).toBe( value, 'Input value is not trimmed' );
      expect( componentInstance.example ).toBe( value, 'Module is not trimmed' );
      expect( componentInstance.example ).toBe( inputElement.value );

    } );

    it( 'should trim whitespaces from the end on the BLUR event', () => {

      inputElement.value = valueWithWhitespaces;

      inputElement.dispatchEvent( new Event( 'blur' ) );

      fixture.detectChanges();

      expect( inputElement.value ).toBe( value, 'Input value is not trimmed' );
      expect( componentInstance.example ).toBe( value, 'Module is not trimmed' );
      expect( componentInstance.example ).toBe( inputElement.value );

    } );

    it( 'should trim whitespaces of value of `email` input', () => {

      inputElement.value = valueWithWhitespaces;
      inputElement.type = 'email';

      inputElement.dispatchEvent( new Event( 'input' ) );

      fixture.detectChanges();

      expect( inputElement.value ).toBe( value, 'Input value is not trimmed' );
      expect( componentInstance.example ).toBe( value, 'Module is not trimmed' );
      expect( componentInstance.example ).toBe( inputElement.value );

    } );

    it( 'should trim a value w/ whitespaces on two-way binding.', fakeAsync( () => {

      componentInstance.example = valueWithWhitespaces;

      fixture.detectChanges();
      tick();

      expect( componentInstance.example ).toBe( inputElement.value, 'Value of model and input is the same' );

      inputElement.dispatchEvent( new Event( 'input' ) );

      expect( inputElement.value ).toBe( value, 'Input value is not trimmed' );
      expect( componentInstance.example ).toBe( value, 'Module is not trimmed' );

    } ) );

  } );

  describe( 'Directive with the blur option', () => {

    const template = `<input name="example" [(ngModel)]="example" value="" trim="blur"/>`;

    beforeEach( () => {
      TestBed.overrideTemplate( TemplateDrivenFormComponent, template );
      createComponentHelper();
    } );

    it( 'should not trim whitespaces from the end on the INPUT event ', () => {

      inputElement.value = valueWithWhitespaces;

      inputElement.dispatchEvent( new Event( 'input' ) );

      fixture.detectChanges();

      expect( inputElement.value ).not.toBe( value, 'Input value is trimmed' );
      expect( componentInstance.example ).toBe( valueWithWhitespaces, 'Model is trimmed' );

      expect( componentInstance.example ).toBe( inputElement.value );

    } );

    it( 'should trim whitespaces from the end on the BLUR event', () => {

      inputElement.value = valueWithWhitespaces;

      inputElement.dispatchEvent( new Event( 'blur' ) );

      fixture.detectChanges();

      expect( inputElement.value ).toBe( value, 'Input value is not trimmed' );
      expect( componentInstance.example ).toBe( value, 'Module is not trimmed' );
      expect( componentInstance.example ).toBe( inputElement.value );

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

