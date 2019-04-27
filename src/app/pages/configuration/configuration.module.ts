import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationComponent } from './configuration.component';
import {RouterModule, Routes} from '@angular/router';
import {MaterialModule} from '../../material.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: ConfigurationComponent
  }
];


@NgModule({
  declarations: [ConfigurationComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild(routes),
    HttpClientModule,
  ]
})
export class ConfigurationModule { }
