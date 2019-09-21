import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WizardComponent} from './wizard.component';
import {MaterialModule} from '../../material.module';
import {RouterModule, Routes} from '@angular/router';
import {MatStepperModule} from '@angular/material/stepper';
import {FormsModule} from '@angular/forms';

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
    RouterModule.forChild(routes),
  ]
})
export class WizardModule {
}
