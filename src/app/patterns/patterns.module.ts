import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PatternsComponent} from './patterns.component';
import {PatternListComponent} from './pattern-list/pattern-list.component';
import {PatternEditComponent} from './pattern-edit/pattern-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';

const routes: Routes = [
  {
    path: '',
    component: PatternsComponent,
    children: [
      {path: ':id', component: PatternEditComponent},
      {path: '', component: PatternListComponent},
    ]
  }
];

@NgModule({
  declarations: [PatternsComponent, PatternListComponent, PatternEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ]
})
export class PatternsModule {
}
