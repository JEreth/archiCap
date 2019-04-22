import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemsComponent } from './systems.component';
import { SystemListComponent } from './system-list/system-list.component';
import { SystemEditComponent } from './system-edit/system-edit.component';

@NgModule({
  declarations: [SystemsComponent, SystemListComponent, SystemEditComponent],
  imports: [
    CommonModule
  ]
})
export class SystemsModule { }
