import {Component, Inject, OnInit} from '@angular/core';
import {Capability} from '../../capabilities/shared/capability';
import {Pattern} from '../shared/pattern';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {System} from '../../systems/shared/system';
import {SystemService} from '../../systems/shared/system.service';
import {CapabilityService} from '../../capabilities/shared/capability.service';
import {SystemInfoComponent} from '../../systems/system-info/system-info.component';
import {CapabilityInfoComponent} from '../../capabilities/capability-info/capability-info.component';

@Component({
  selector: 'app-pattern-info',
  templateUrl: './pattern-info.component.html',
  styleUrls: ['./pattern-info.component.scss']
})
export class PatternInfoComponent implements OnInit {

  pattern: Pattern;
  relatedSystems: System[] = [];
  relatedCapabilities: Capability[] = [];

  constructor(
    public dialogRef: MatDialogRef<PatternInfoComponent>,
    private systemService: SystemService,
    private capabilityService: CapabilityService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.pattern) {
      this.pattern = data.pattern;
    }
  }

  async ngOnInit() {
    this.relatedSystems = await (this.systemService.findBy(this.pattern.systems)) as System[];
    this.relatedCapabilities = await (this.capabilityService.findBy(this.pattern.capabilities)) as Capability[];
  }

  // close popover
  closePopover() {
    this.dialogRef.close();
  }

  showSystemInfo(event, system: System) {
    event.stopPropagation();
    this.dialog.open(SystemInfoComponent, {
      data: {system},
    });
  }

  showCapabilityInfo(event, capability: Capability) {
    event.stopPropagation();
    this.dialog.open(CapabilityInfoComponent, {
      data: {capability},
    });
  }

}
