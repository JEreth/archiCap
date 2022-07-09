import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PatternsComponent} from './patterns.component';
import {PatternListComponent} from './pattern-list/pattern-list.component';
import {PatternEditComponent} from './pattern-edit/pattern-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';
import {PatternInfoModule} from './pattern-info/pattern-info.module';
import { PatternSpecifyComponent } from './pattern-specify/pattern-specify.component';
import {AttributeSelectionModule} from '../eav/attribute-selection/attribute-selection.module';

const routes: Routes = [
  {
    path: '',
    component: PatternsComponent,
    children: [
      {path: 'specify/:id', component: PatternSpecifyComponent},
      {path: 'edit/:id', component: PatternEditComponent},
      {path: 'new', component: PatternEditComponent},
      {path: '', component: PatternListComponent},
    ]
  }
];

@NgModule({
  declarations: [PatternsComponent, PatternListComponent, PatternEditComponent, PatternSpecifyComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PatternInfoModule,
    MaterialModule,
    AttributeSelectionModule,
    RouterModule.forChild(routes),
  ]
})
export class PatternsModule {
}
