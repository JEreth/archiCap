import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile.component';
import {RouterModule, Routes} from '@angular/router';
import {MaterialModule} from '../../material.module';
import {FormsModule} from '@angular/forms';
import {ProductInfoModule} from '../../products/product-info/product-info.module';
import {CapabilityInfoModule} from '../../capabilities/capability-info/capability-info.module';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  }
];

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ProductInfoModule,
    CapabilityInfoModule,
    RouterModule.forChild(routes),
  ]
})
export class ProfileModule {
}
