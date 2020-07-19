import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material.module';
import {RouterModule, Routes} from '@angular/router';
import {AttributesetEditComponent} from './attributeset-edit/attributeset-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EavComponent} from './eav.component';
import {AttributeEditComponent} from './attribute-edit/attribute-edit.component';

const routes: Routes = [
  {
    path: '',
    component: EavComponent,
    children: [
      {path: 'attribute-set/:type/edit/:id', component: AttributesetEditComponent},
      {path: 'attribute-set/:type/add', component: AttributesetEditComponent},
      {path: 'attribute/:type/edit/:id', component: AttributeEditComponent},
      {path: 'attribute/:type/add', component: AttributeEditComponent},
    ]
  }
];

@NgModule({
  declarations: [AttributesetEditComponent, EavComponent, AttributeEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ]
})
export class EavModule {
}
