import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CapabilitiesComponent} from './capabilities.component';
import {CapabilityEditComponent} from './capability-edit/capability-edit.component';
import {CapabilityListComponent} from './capability-list/capability-list.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';
import {AttributesetListModule} from '../eav/attributeset-list/attributeset-list.module';
import {CapabilitySpecifyComponent} from './capability-specify/capability-specify.component';
import {AttributeSelectionModule} from "../eav/attribute-selection/attribute-selection.module";

const routes: Routes = [
  {
    path: '',
    component: CapabilitiesComponent,
    children: [
      {path: 'specify/:id', component: CapabilitySpecifyComponent},
      {path: 'edit/:id', component: CapabilityEditComponent},
      {path: 'add', component: CapabilityEditComponent},
      {path: '', component: CapabilityListComponent},
    ]
  }
];

@NgModule({
  declarations: [CapabilitiesComponent, CapabilityEditComponent, CapabilityListComponent, CapabilitySpecifyComponent],
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
export class CapabilitiesModule {
}
