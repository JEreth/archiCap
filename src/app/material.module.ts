import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule
  ],
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule
  ]
})
export class MaterialModule { }
