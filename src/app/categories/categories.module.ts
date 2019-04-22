import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { CategoryListComponent } from './category-list/category-list.component';
import {RouterModule, Routes} from '@angular/router';
import {MaterialModule} from '../material.module';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
    children: [
      { path: ':id', component: CategoryEditComponent },
      { path: '', component: CategoryListComponent },
    ]
  }
];


@NgModule({
  declarations: [CategoriesComponent, CategoryListComponent, CategoryEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
})
export class CategoriesModule { }
