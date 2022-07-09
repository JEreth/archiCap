import {Component, Inject, OnInit} from '@angular/core';
import {Pattern} from '../../patterns/shared/pattern';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Capability} from '../shared/capability';
import {PatternService} from '../../patterns/shared/pattern.service';
import {PatternInfoComponent} from '../../patterns/pattern-info/pattern-info.component';
import {Category} from '../../categories/shared/category';
import {ConfigurationService} from '../../shared/configuration.service';

@Component({
  selector: 'app-capability-info',
  templateUrl: './capability-info.component.html',
  styleUrls: ['./capability-info.component.scss']
})
export class CapabilityInfoComponent implements OnInit {

  capability: Capability;
  category: Category;
  relatedPatterns: Pattern[] = [];

  constructor(
    public dialogRef: MatDialogRef<CapabilityInfoComponent>,
    private dialog: MatDialog,
    private configurationService: ConfigurationService,
    private patternService: PatternService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.capability) {
      this.capability = data.capability;
    }
  }

  async ngOnInit() {
    this.relatedPatterns = await (this.patternService.findBy(this.capability.id, 'capabilities')) as Pattern[];
    const configuration = await this.configurationService.get();
    this.category = configuration.categories.find(i => i.id === this.capability.category);
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
