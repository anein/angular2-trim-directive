import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { Component, ViewChild } from "@angular/core";
import { InputTrimModule } from "../src";
import { By } from "@angular/platform-browser";
import { FormsModule, NgModel } from "@angular/forms";

/**
 * Defines the artificial test component
 */
@Component({
  template: `
    <h2>TemplateDrivenFormComponent</h2>
    <label for="ex-trim">My input!</label>
    <input id="ex-trim" name="example" #exampleModel="ngModel" [(ngModel)]="example" trim />
    <span *ngIf="!exampleModel.touched">Example Not Touched</span>
    <span *ngIf="exampleModel.touched">Example Touched</span> <i *ngIf="exampleModel.pristine">Example Pristine</i>
    <i *ngIf="!exampleModel.pristine">Example Dirty</i>
  `
})
class TemplateDrivenFormComponent {
  @ViewChild("exampleModel") exampleModel: NgModel;

  example: string | undefined;
}

describe("Tests: Template-Driven Form", () => {
  let componentInstance: TemplateDrivenFormComponent;

  let fixture: ComponentFixture<TemplateDrivenFormComponent>;

  let inputElement: HTMLInputElement;

  let value: string = "Bob";
  let valueWithWhitespaces = "Bob   ";

  beforeEach(() => {
    // create a component fixture
    TestBed.configureTestingModule({
      imports: [FormsModule, InputTrimModule],
      declarations: [TemplateDrivenFormComponent]
    });
  });

  describe("Initialization", () => {
    beforeEach(() => createComponentHelper());

    it("should create component", () => expect(componentInstance).toBeDefined());

    it('should have title "TemplateDrivenFormComponent" ', () => {
      const el = fixture.debugElement.query(By.css("h2")).nativeElement;

      expect(el.textContent).toContain("TemplateDrivenFormComponent");
    });

    it("should have the empty input fields and models", () => {
      expect(inputElement.value).toBe("");
      expect(componentInstance.example).toBe(undefined);
    });

    it("should write value to the element when the NgModel's form control value is set", () => {
      componentInstance.exampleModel.control.setValue(value);
      expect(inputElement.value).toBe(value);

      componentInstance.exampleModel.control.setValue(valueWithWhitespaces);
      expect(inputElement.value).toBe(valueWithWhitespaces);
    });

    it(`should NOT change initial state of the "undefined" model if input value is empty`, () => {
      componentInstance.exampleModel.control.setValue(undefined);

      inputElement.dispatchEvent(new Event("input"));

      fixture.detectChanges();

      expect(typeof inputElement.value).toBe("string");
      expect(inputElement.value).toBe("");

      expect(componentInstance.example).toBe(undefined);
    });

    /**
     *  SEE:
     *    https://github.com/anein/angular2-trim-directive/issues/39
     */
    it( "should allow to set empty string in a field", () => {

      let expectedValue = value;

      inputElement.value = value;

      inputElement.dispatchEvent( new Event( "input" ) );

      fixture.detectChanges();

      expect( componentInstance.example ).toBe( expectedValue, "The model is not updated" );

      value = "";
      expectedValue = "";

      inputElement.value = value;

      inputElement.dispatchEvent( new Event( "input" ) );

      fixture.detectChanges();

      expect( componentInstance.example ).toBe( expectedValue, "Model is not empty" )

    } );

    it(`should return an empty string if value is null `, () => {
      componentInstance.exampleModel.control.setValue(null);

      inputElement.dispatchEvent(new Event("input"));

      fixture.detectChanges();

      expect(inputElement.value).toBe("");
    });
  });

  describe("Directive without additional options.", () => {
    beforeEach(() => createComponentHelper());

    it("should trim whitespaces on the INPUT event", () => {
      componentInstance.exampleModel.control.setValue(valueWithWhitespaces);

      expect(componentInstance.exampleModel.pristine).toBeTruthy();

      inputElement.dispatchEvent(new Event("input"));

      // fixture.detectChanges();

      expect(inputElement.value).toBe(value, "Input value is not trimmed");
      expect(componentInstance.example).toBe(value, "Model is not trimmed");
      expect(componentInstance.example).toBe(inputElement.value);

      expect(componentInstance.exampleModel.dirty).toBeTruthy();
    });

    it("should keep pristine from the end on the BLUR event w/o changes", () => {
      componentInstance.exampleModel.control.setValue(value);

      fixture.detectChanges();

      expect(componentInstance.exampleModel.touched).toBeFalsy("Example Touched!");
      expect(componentInstance.exampleModel.pristine).toBeTruthy("Example Pristined");

      inputElement.dispatchEvent(new Event("blur"));

      fixture.detectChanges();

      expect(inputElement.value).toBe(value);
      expect(componentInstance.example).toBe(value);
      expect(componentInstance.example).toBe(inputElement.value);

      expect(componentInstance.exampleModel.touched).toBeTruthy("Example NOT Touched!");
      expect(componentInstance.exampleModel.pristine).toBeTruthy("Example Pristined");
    });

    it("should trim whitespaces from the end on the BLUR event", () => {
      componentInstance.exampleModel.control.setValue(valueWithWhitespaces);

      fixture.detectChanges();
      expect(componentInstance.exampleModel.touched).toBeFalsy("Example Touched");
      expect(componentInstance.exampleModel.dirty).toBeFalsy("Example model changed!");
      expect(componentInstance.exampleModel.pristine).toBeTruthy("'Example NOT pristine");

      inputElement.dispatchEvent(new Event("blur"));

      fixture.detectChanges();

      expect(inputElement.value).toBe(value, "Input value is not trimmed");
      expect(componentInstance.example).toBe(value, "Model is not trimmed");
      expect(componentInstance.example).toBe(inputElement.value);

      expect(componentInstance.exampleModel.touched).toBeTruthy("Example NOT Touched");
      expect(componentInstance.exampleModel.dirty).toBeTruthy("Example model NOT changed!");
    });

    it("should trim whitespaces of value of `email` input", () => {
      componentInstance.exampleModel.control.setValue(valueWithWhitespaces);
      inputElement.type = "email";

      inputElement.dispatchEvent(new Event("input"));

      fixture.detectChanges();

      expect(inputElement.value).toBe(value, "Input value is not trimmed");
      expect(componentInstance.example).toBe(value, "Model is not trimmed");
      expect(componentInstance.example).toBe(inputElement.value);
    });

    it("should trim a value w/ whitespaces on two-way binding.", fakeAsync(() => {
      componentInstance.example = valueWithWhitespaces;

      fixture.detectChanges();
      tick();

      expect(componentInstance.example).toBe(inputElement.value, "Value of model and input is the same");

      inputElement.dispatchEvent(new Event("input"));

      expect(inputElement.value).toBe(value, "Input value is not trimmed");
      expect(componentInstance.example).toBe(value, "Model is not trimmed");
    }));
  });

  describe("Directive with the blur option", () => {
    const template = `
      <input name="example" #exampleModel="ngModel" [(ngModel)]="example" value="" trim="blur"/>
      <span *ngIf="!exampleModel.touched">Example Not Touched</span>
      <span *ngIf="exampleModel.touched">Example Touched</span>
      <i *ngIf="exampleModel.pristine">Example Pristine</i>
      <i *ngIf="!exampleModel.pristine">Example Dirty</i>
    `;

    beforeEach(() => {
      TestBed.overrideTemplate(TemplateDrivenFormComponent, template);
      createComponentHelper();
    });

    it("should not trim whitespaces from the end on the INPUT event ", () => {
      componentInstance.example = inputElement.value = valueWithWhitespaces;

      inputElement.dispatchEvent(new Event("input"));

      fixture.detectChanges();

      expect(inputElement.value).not.toBe(value, "Input value is trimmed");
      expect(componentInstance.example).toBe(valueWithWhitespaces, "Model is trimmed");

      expect(componentInstance.example).toBe(inputElement.value);
    });

    //
    // SEE:
    //
    it("should trim whitespaces from the end on the blur event and update the model", () => {
      inputElement.value = "a";

      inputElement.dispatchEvent(new Event("blur"));

      fixture.detectChanges();

      expect(componentInstance.example).toBe("a", "The model is not updated");
    });

    it("should NOT change the model on the BLUR event", () => {
      componentInstance.exampleModel.control.setValue(value);

      fixture.detectChanges();

      expect(componentInstance.exampleModel.touched).toBeFalsy("Example Touched");
      expect(componentInstance.exampleModel.dirty).toBeFalsy("Example model CHANGED");

      inputElement.dispatchEvent(new Event("blur"));

      fixture.detectChanges();

      expect(inputElement.value).toBe(value);
      expect(componentInstance.example).toBe(value);
      expect(componentInstance.example).toBe(inputElement.value);

      expect(componentInstance.exampleModel.touched).toBeTruthy("Example NOT Touched");
      expect(componentInstance.exampleModel.dirty).toBeFalsy("Example model CHANGED");
    });

    it("should trim whitespaces from the end on the BLUR event", () => {
      componentInstance.exampleModel.control.setValue(valueWithWhitespaces);

      expect(componentInstance.exampleModel.touched).toBeFalsy("Example Touched");
      expect(componentInstance.exampleModel.dirty).toBeFalsy("Example model CHANGED");

      inputElement.dispatchEvent(new Event("blur"));

      fixture.detectChanges();

      expect(inputElement.value).toBe(value, "Input value is not trimmed");
      expect(componentInstance.example).toBe(value, "Model is not trimmed");
      expect(componentInstance.example).toBe(inputElement.value);

      expect(componentInstance.exampleModel.touched).toBeTruthy("Example NOT Touched");
      expect(componentInstance.exampleModel.dirty).toBeTruthy("Example model NOT CHANGED");
    });
  });

  function createComponentHelper(): void {
    fixture = TestBed.createComponent(TemplateDrivenFormComponent);

    // get the instance
    componentInstance = fixture.componentInstance;

    // get the element
    inputElement = fixture.debugElement.query(By.css("input")).nativeElement;

    fixture.detectChanges();
  }
});
