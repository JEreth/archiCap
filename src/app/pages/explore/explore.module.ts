import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExploreComponent} from './explore.component';
import {RouterModule, Routes} from '@angular/router';
import {MaterialModule} from '../../material.module';
import {CompositionModule} from '../../shared/composition/composition.module';

const routes: Routes = [
  {
    path: '',
    component: ExploreComponent
  }
];

@NgModule({
  declarations: [ExploreComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CompositionModule,
    RouterModule.forChild(routes),
  ]
})
export class ExploreModule {
}
