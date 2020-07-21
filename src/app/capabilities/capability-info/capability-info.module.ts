import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CapabilityInfoComponent} from './capability-info.component';
import {MaterialModule} from '../../material.module';
import {AttributeSelectionModule} from '../../eav/attribute-selection/attribute-selection.module';


@NgModule({
  declarations: [CapabilityInfoComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AttributeSelectionModule
  ],
  exports: [CapabilityInfoComponent]
})
export class CapabilityInfoModule {
}
