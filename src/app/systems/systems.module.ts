import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemsComponent } from './systems.component';
import { SystemListComponent } from './system-list/system-list.component';
import { SystemEditComponent } from './system-edit/system-edit.component';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';
import {RouterModule, Routes} from '@angular/router';
import { CompositionComponent } from './composition/composition.component';
import { SystemInfoComponent } from './system-info/system-info.component';

const routes: Routes = [
  {
    path: '',
    component: SystemsComponent,
    children: [
      { path: ':id', component: SystemEditComponent },
      { path: '', component: SystemListComponent },
    ]
  }
];

@NgModule({
  declarations: [SystemsComponent, SystemListComponent, SystemEditComponent, CompositionComponent, SystemInfoComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ]
})
export class SystemsModule { }
