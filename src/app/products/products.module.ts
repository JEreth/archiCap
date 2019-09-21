import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsComponent} from './products.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductEditComponent} from './product-edit/product-edit.component';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      {path: ':id', component: ProductEditComponent},
      {path: '', component: ProductListComponent},
    ]
  }
];

@NgModule({
  declarations: [ProductsComponent, ProductListComponent, ProductEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ]
})
export class ProductsModule {
}
