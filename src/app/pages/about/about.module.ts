import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AboutComponent} from './about.component';
import {RouterModule, Routes} from '@angular/router';
import {MaterialModule} from '../../material.module';

const routes: Routes = [
  {
    path: '',
    component: AboutComponent
  }
];


@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ]
})
export class AboutModule {
}
