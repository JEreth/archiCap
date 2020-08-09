import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {System} from '../shared/system';
import {Pattern} from '../../patterns/shared/pattern';
import {PatternService} from '../../patterns/shared/pattern.service';
import {Product} from '../../products/shared/product';
import {ProductService} from '../../products/shared/product.service';
import {SystemService} from '../shared/system.service';
import {PatternInfoComponent} from '../../patterns/pattern-info/pattern-info.component';

@Component({
  selector: 'app-system-info',
  templateUrl: './system-info.component.html',
  styleUrls: ['./system-info.component.scss']
})
export class SystemInfoComponent implements OnInit {

  system: System;
  relatedPatterns: Pattern[] = [];
  relatedProducts: Product[] = [];
  relatedSubstitutes: System[] = [];

  constructor(
    public dialogRef: MatDialogRef<SystemInfoComponent>,
    private patternService: PatternService,
    private productService: ProductService,
    private systemService: SystemService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.system) {
      this.system = data.system;
    }
  }

  async ngOnInit() {
    this.relatedPatterns = await (this.patternService.findBy(this.system.id, 'systems')) as Pattern[];
    this.relatedProducts = await (this.productService.findBy(this.system.products)) as Product[];
    this.relatedSubstitutes = await (this.systemService.findBy(this.system.substitutions)) as System[];
  }

  // close popover
  closePopover() {
    this.dialogRef.close();
  }

  showPatternInfo(event, pattern: Pattern) {
    event.stopPropagation();
    this.dialog.open(PatternInfoComponent, {
      data: {pattern},
    });
  }

}
