import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../../../material.module';
import {SystemInfoComponent} from './system-info.component';

@NgModule({
  declarations: [SystemInfoComponent],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  entryComponents: [SystemInfoComponent],
  exports: [SystemInfoComponent]
})
export class SystemInfoModule { }
