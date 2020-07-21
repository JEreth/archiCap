import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CompositionComponent} from './composition.component';
import {MaterialModule} from '../../material.module';
import {FormsModule} from '@angular/forms';
import {SystemInfoModule} from '../../systems/system-info/system-info.module';
import {PatternInfoModule} from '../../patterns/pattern-info/pattern-info.module';
import {CapabilityInfoModule} from '../../capabilities/capability-info/capability-info.module';

@NgModule({
  declarations: [CompositionComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    SystemInfoModule,
    PatternInfoModule,
    CapabilityInfoModule,
  ],
  exports: [CompositionComponent]
})
export class CompositionModule {
}
