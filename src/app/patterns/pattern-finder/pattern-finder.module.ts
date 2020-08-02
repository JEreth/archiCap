import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PatternFinderComponent} from './pattern-finder.component';
import {MaterialModule} from '../../material.module';
import {FormsModule} from '@angular/forms';
import {AttributeSelectionModule} from '../../eav/attribute-selection/attribute-selection.module';
import {SystemInfoModule} from '../../systems/system-info/system-info.module';
import {PatternInfoModule} from '../pattern-info/pattern-info.module';
import {CapabilityInfoModule} from '../../capabilities/capability-info/capability-info.module';


@NgModule({
  declarations: [PatternFinderComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    AttributeSelectionModule,
    SystemInfoModule,
    PatternInfoModule,
    CapabilityInfoModule
  ],
  exports: [PatternFinderComponent]
})
export class PatternFinderModule {
}
