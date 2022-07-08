import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../material.module';
import {SystemInfoComponent} from './system-info.component';
import {AttributeSelectionModule} from '../../eav/attribute-selection/attribute-selection.module';

@NgModule({
    declarations: [SystemInfoComponent],
    imports: [
        CommonModule,
        MaterialModule,
        AttributeSelectionModule
    ],
    exports: [SystemInfoComponent]
})
export class SystemInfoModule {
}
