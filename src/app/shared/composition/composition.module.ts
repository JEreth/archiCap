import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CompositionComponent} from './composition.component';
import {MaterialModule} from '../../material.module';
import {FormsModule} from '@angular/forms';
import {SystemInfoModule} from '../../systems/system-info/system-info.module';
import {PatternInfoModule} from '../../patterns/pattern-info/pattern-info.module';
import {CapabilityInfoModule} from '../../capabilities/capability-info/capability-info.module';
import {ProductInfoModule} from '../../products/product-info/product-info.module';
import {PatternFinderModule} from '../../patterns/pattern-finder/pattern-finder.module';

@NgModule({
  declarations: [CompositionComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    SystemInfoModule,
    PatternInfoModule,
    ProductInfoModule,
    CapabilityInfoModule,
    PatternFinderModule
  ],
  exports: [CompositionComponent]
})
export class CompositionModule {
}
