import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {SystemService} from '../../systems/shared/system.service';
import {Product} from '../shared/product';
import {System} from '../../systems/shared/system';
import {SystemInfoComponent} from '../../systems/system-info/system-info.component';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {

  product: Product;
  relatedSystems: System[];

  constructor(
    public dialogRef: MatDialogRef<ProductInfoComponent>,
    private systemService: SystemService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.product) {
      this.product = data.product;
    }
  }

  async ngOnInit() {
    this.relatedSystems = await (this.systemService.findBy(this.product.id, 'products')) as System[];
  }

  closePopover() {
    this.dialogRef.close();
  }

  showSystemInfo(event, system: System) {
    event.stopPropagation();
    this.dialog.open(SystemInfoComponent, {
      data: {system},
    });
  }

}
