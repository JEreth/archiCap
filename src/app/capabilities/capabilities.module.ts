import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CapabilitiesComponent} from './capabilities.component';
import {CapabilityEditComponent} from './capability-edit/capability-edit.component';
import {CapabilityListComponent} from './capability-list/capability-list.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';
import {AttributesetListModule} from '../eav/attributeset-list/attributeset-list.module';

const routes: Routes = [
  {
    path: '',
    component: CapabilitiesComponent,
    children: [
      {path: ':id', component: CapabilityEditComponent},
      {path: '', component: CapabilityListComponent},
    ]
  }
];

@NgModule({
  declarations: [CapabilitiesComponent, CapabilityEditComponent, CapabilityListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AttributesetListModule,
    RouterModule.forChild(routes),
  ]
})
export class CapabilitiesModule {
}
