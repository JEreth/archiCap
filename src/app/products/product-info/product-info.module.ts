import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../material.module';
import {ProductInfoComponent} from './product-info.component';

@NgModule({
  declarations: [ProductInfoComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  entryComponents: [ProductInfoComponent],
  exports: [ProductInfoComponent]
})
export class ProductInfoModule {
}
