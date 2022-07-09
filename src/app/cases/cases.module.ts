import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CasesComponent } from './cases.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';
import {RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from '../products/products.component';
import { CaseListComponent } from './case-list/case-list.component';
import { CaseEditComponent } from './case-edit/case-edit.component';
import { CircumstanceSpecifyComponent } from './circumstance-specify/circumstance-specify.component';
import { SystemSpecifyComponent } from './system-specify/system-specify.component';
import {AttributeSelectionModule} from '../eav/attribute-selection/attribute-selection.module';
import { CircumstanceCompareComponent } from './circumstance-compare/circumstance-compare.component';
import { SystemCompareComponent } from './system-compare/system-compare.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      {path: 'edit/:id/system/specify/:index', component: SystemSpecifyComponent},
      {path: 'edit/:id/system/specify', component: SystemSpecifyComponent},
      {path: 'edit/:id/system/compare/:index', component: SystemCompareComponent},
      {path: 'edit/:id/circumstance/specify/:index', component: CircumstanceSpecifyComponent},
      {path: 'edit/:id/circumstance/compare/:index', component: CircumstanceCompareComponent},
      {path: 'edit/:id/circumstance/specify', component: CircumstanceSpecifyComponent},
      {path: 'edit/:id', component: CaseEditComponent},
      {path: 'new', component: CaseEditComponent},
      {path: '', component: CaseListComponent},
    ]
  }
];

@NgModule({
  declarations: [
    CasesComponent,
    CaseListComponent,
    CaseEditComponent,
    CircumstanceSpecifyComponent,
    SystemSpecifyComponent,
    CircumstanceCompareComponent,
    SystemCompareComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AttributeSelectionModule,
    RouterModule.forChild(routes),
  ]
})
export class CasesModule { }
