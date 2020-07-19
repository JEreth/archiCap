import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AttributesetListComponent} from './attributeset-list.component';
import {MaterialModule} from '../../material.module';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [AttributesetListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [AttributesetListComponent],
})
export class AttributesetListModule {
}
