import { Component, OnInit } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTrimDirective } from '../src/input-trim.directive';
import { By } from '@angular/platform-browser';
import { tick } from '@angular/core/testing';

@Component( {
  template: `
    <h2>ReactiveFormComponent</h2>
    <form novalidate [formGroup]="myGroup">
      <label for="ex-trim">My input!</label>
      <input id="ex-trim" formControlName="example" trim/>
    </form>
  `
} )
class ReactiveFormComponent implements OnInit {

  myGroup: FormGroup;

  constructor() {
  }

  ngOnInit() {

    this.myGroup = new FormGroup( {
      example : new FormControl( '' ),
      example2: new FormControl( '' )
    } );
  }

}

describe( 'Tests: Reactive Form', () => {

  let componentInstance: ReactiveFormComponent;

  let fixture: ComponentFixture<ReactiveFormComponent>;

  let inputElement: HTMLInputElement;

  const value: string = 'Bob';
  const valueWithWhitespaces = 'Bob   ';

  beforeEach( () => {
    TestBed.configureTestingModule( {
      imports     : [ReactiveFormsModule],
      declarations: [InputTrimDirective, ReactiveFormComponent]
    } );
  } );

  describe( 'Initialization', () => {

    beforeEach( () => createComponentHelper() );

    it( 'should create component', () => expect( componentInstance ).toBeDefined() );

    it( 'should have title "ReactiveFormComponent" ', () => {

      const el = fixture.debugElement.query( By.css( 'h2' ) ).nativeElement;

      expect( el.textContent ).toContain( 'ReactiveFormComponent' );

    } );

    it( 'should have the empty input field and model', () => {

      expect( inputElement.value ).toBe( '' );
      expect( componentInstance.myGroup ).toBeDefined();
      expect( componentInstance.myGroup.value.example ).toBeDefined();
      expect( componentInstance.myGroup.value.example ).toBe( '' );

    } );

  } );

  describe( 'Directive without additional options.', () => {

    beforeEach( () => createComponentHelper() );

    it( 'should trim whitespaces from the end on the INPUT event', () => {

      inputElement.value = valueWithWhitespaces;

      inputElement.dispatchEvent( new Event( 'input' ) );

      fixture.detectChanges();

      expect( inputElement.value ).toBe( value, 'Input value is not trimmed' );
      expect( componentInstance.myGroup.value.example ).toBe( value, 'Model is not trimmed' );
      expect( componentInstance.myGroup.value.example ).toBe( inputElement.value );
      expect( componentInstance.myGroup.value.example2 ).toBe( '' );

    } );

    it( 'should trim whitespaces from the end on the BLUR event', () => {

      inputElement.value = valueWithWhitespaces;
      inputElement.dispatchEvent( new Event( 'blur' ) );

      fixture.detectChanges();

      expect( inputElement.value ).toBe( value, 'Input value is not trimmed' );
      expect( componentInstance.myGroup.value.example ).toBe( value, 'Model is not trimmed' );
      expect( componentInstance.myGroup.value.example ).toBe( inputElement.value );

    } );

    it( 'should trim a value w/ whitespaces on two-way binding.', fakeAsync( () => {

      componentInstance.myGroup.controls.example.setValue( valueWithWhitespaces );

      fixture.detectChanges();
      tick();

      expect( componentInstance.myGroup.value.example ).toBe( inputElement.value, 'Value of model and input is the same' );

      inputElement.dispatchEvent( new Event( 'input' ) );

      expect( inputElement.value ).toBe( value, 'Input value is not trimmed' );
      expect( componentInstance.myGroup.value.example ).toBe( value, 'Model is not trimmed' );

    } ) );

  } );

  describe( 'Directive with the blur option', () => {

    const template = `<h2>ReactiveFormComponent</h2>
    <form novalidate [formGroup]="myGroup">
      <label for="ex-trim">My input!</label>
      <input id="ex-trim" name="example" formControlName="example" trim="blur"/>
      <input name="example2" formControlName="example2" trim/>
    </form>`;

    beforeEach( () => {
      TestBed.overrideTemplate( ReactiveFormComponent, template );
      createComponentHelper();
    } );

    it( 'should not trim whitespaces from the end on the INPUT event ', () => {

      inputElement.value = valueWithWhitespaces;

      inputElement.dispatchEvent( new Event( 'input' ) );

      fixture.detectChanges();

      expect( inputElement.value ).not.toBe( value, 'Input value is trimmed' );
      expect( componentInstance.myGroup.value.example ).toBe( valueWithWhitespaces, 'Model is trimmed' );

      expect( componentInstance.myGroup.value.example ).toBe( inputElement.value );

    } );

    it( 'should trim whitespaces from the end on the BLUR event', () => {

      inputElement.value = valueWithWhitespaces;

      inputElement.dispatchEvent( new Event( 'blur' ) );

      fixture.detectChanges();

      expect( inputElement.value ).toBe( value, 'Input value is not trimmed' );
      expect( componentInstance.myGroup.value.example ).toBe( value, 'Module is not trimmed' );
      expect( componentInstance.myGroup.value.example ).toBe( inputElement.value );

    } );

    it( 'should trim whitespaces from the end of Example2 on the INPUT event', () => {

      const inputElement2 = fixture.debugElement.query( By.css( 'input[name="example2"]' ) ).nativeElement;

      inputElement2.value = valueWithWhitespaces;

      inputElement2.dispatchEvent( new Event( 'input' ) );

      fixture.detectChanges();

      expect( inputElement2.value ).toBe( value, 'Example2:Input is trimmed' );
      expect( componentInstance.myGroup.value.example2 ).toBe( value, 'Example2:Model is trimmed' );

      expect( inputElement.value ).not.toBe( value, 'Input value is trimmed' );
      expect( componentInstance.myGroup.value.example ).toBe( inputElement.value );

    } );

  } );

  function createComponentHelper(): void {

    fixture = TestBed.createComponent( ReactiveFormComponent );

    // get the instance
    componentInstance = fixture.componentInstance;

    // get the element
    inputElement = fixture.debugElement.query( By.css( 'input' ) ).nativeElement;

    fixture.detectChanges();

  }

} );
