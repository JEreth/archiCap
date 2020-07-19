import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AttributeSelectionComponent} from './attribute-selection.component';
import {MaterialModule} from "../../material.module";


@NgModule({
  declarations: [AttributeSelectionComponent],
  exports: [
    AttributeSelectionComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class AttributeSelectionModule {
}
