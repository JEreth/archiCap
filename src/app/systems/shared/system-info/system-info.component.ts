import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {System} from '../system';

@Component({
  selector: 'app-system-info',
  templateUrl: './system-info.component.html',
  styleUrls: ['./system-info.component.scss']
})
export class SystemInfoComponent implements OnInit {

  public system: System;

  constructor(
    public dialogRef: MatDialogRef<SystemInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.system) {
      this.system = data.system;
    }

  }

  ngOnInit() {
  }

  // close popover
  closePopover() {
    this.dialogRef.close();
  }


}
