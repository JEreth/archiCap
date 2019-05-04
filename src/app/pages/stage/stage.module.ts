import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StageComponent } from './stage.component';
import {MaterialModule} from '../../material.module';
import {RouterModule, Routes} from '@angular/router';
import {CompositionModule} from '../../shared/composition/composition.module';

const routes: Routes = [
  {
    path: '',
    component: StageComponent
  }
];

@NgModule({
  declarations: [StageComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CompositionModule,
    RouterModule.forChild(routes),
  ]
})
export class StageModule { }
