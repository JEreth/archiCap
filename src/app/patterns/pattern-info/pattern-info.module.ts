import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PatternInfoComponent} from './pattern-info.component';
import {MaterialModule} from '../../material.module';
import {SystemInfoModule} from '../../systems/system-info/system-info.module';
import {CapabilityInfoModule} from '../../capabilities/capability-info/capability-info.module';

@NgModule({
  declarations: [PatternInfoComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SystemInfoModule,
    CapabilityInfoModule
  ],
  exports: [PatternInfoComponent]
})
export class PatternInfoModule {
}
