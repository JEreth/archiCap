import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WizardComponent} from './wizard.component';
import {MaterialModule} from '../../material.module';
import {RouterModule, Routes} from '@angular/router';
import {MatStepperModule} from '@angular/material/stepper';
import {FormsModule} from '@angular/forms';
import {ProductInfoModule} from '../../products/product-info/product-info.module';
import {CapabilityInfoModule} from '../../capabilities/capability-info/capability-info.module';
import {SystemInfoModule} from "../../systems/system-info/system-info.module";

const routes: Routes = [
  {
    path: '',
    component: WizardComponent
  }
];

@NgModule({
  declarations: [WizardComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    MatStepperModule,
    ProductInfoModule,
    CapabilityInfoModule,
    SystemInfoModule,
    RouterModule.forChild(routes),
  ]
})
export class WizardModule {
}
