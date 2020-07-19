import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SystemsComponent} from './systems.component';
import {SystemListComponent} from './system-list/system-list.component';
import {SystemEditComponent} from './system-edit/system-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';
import {RouterModule, Routes} from '@angular/router';
import {AttributesetListModule} from '../eav/attributeset-list/attributeset-list.module';
import {SystemSpecifyComponent} from './system-specify/system-specify.component';
import {AttributeSelectionModule} from '../eav/attribute-selection/attribute-selection.module';

const routes: Routes = [
  {
    path: '',
    component: SystemsComponent,
    children: [
      {path: 'specify/:id', component: SystemSpecifyComponent},
      {path: 'edit/:id', component: SystemEditComponent},
      {path: 'add', component: SystemEditComponent},
      {path: '', component: SystemListComponent},
    ]
  }
];

@NgModule({
  declarations: [SystemsComponent, SystemListComponent, SystemEditComponent, SystemSpecifyComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AttributesetListModule,
    AttributeSelectionModule,
    RouterModule.forChild(routes),
  ]
})
export class SystemsModule {
}
