import {Component, Inject, OnInit} from '@angular/core';
import {Pattern} from '../../patterns/shared/pattern';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Capability} from '../shared/capability';
import {PatternService} from '../../patterns/shared/pattern.service';

@Component({
  selector: 'app-capability-info',
  templateUrl: './capability-info.component.html',
  styleUrls: ['./capability-info.component.scss']
})
export class CapabilityInfoComponent implements OnInit {

  capability: Capability;
  relatedPatterns: Pattern[] = [];

  constructor(
    public dialogRef: MatDialogRef<CapabilityInfoComponent>,
    private patternService: PatternService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.capability) {
      this.capability = data.capability;
    }
  }

  async ngOnInit() {
    this.relatedPatterns = await (this.patternService.findBy(this.capability.id, 'capabilities')) as Pattern[];
  }

  // close popover
  closePopover() {
    this.dialogRef.close();
  }

}
