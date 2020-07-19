import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SystemsComponent} from './systems.component';
import {SystemListComponent} from './system-list/system-list.component';
import {SystemEditComponent} from './system-edit/system-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';
import {RouterModule, Routes} from '@angular/router';
import {AttributesetListModule} from '../eav/attributeset-list/attributeset-list.module';

const routes: Routes = [
  {
    path: '',
    component: SystemsComponent,
    children: [
      {path: ':id', component: SystemEditComponent},
      {path: '', component: SystemListComponent},
    ]
  }
];

@NgModule({
  declarations: [SystemsComponent, SystemListComponent, SystemEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AttributesetListModule,
    RouterModule.forChild(routes),
  ]
})
export class SystemsModule {
}
