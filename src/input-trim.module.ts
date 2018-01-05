import { InputTrimDirective } from './input-trim.directive';
import { NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@NgModule( {
  imports     : [],
  exports     : [InputTrimDirective],
  declarations: [InputTrimDirective],
  providers   : [],
} )
export class InputTrimModule {
}
