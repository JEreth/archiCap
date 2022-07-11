import {Component, OnInit, ViewChild} from '@angular/core';
import {AttributeSelection, AttributeSet} from '../../eav/shared/models';
import {AttributeSetService} from '../../eav/shared/attribute-set.service';
import {AttributeSelectionComponent} from '../../eav/attribute-selection/attribute-selection.component';
import {Pattern} from '../shared/pattern';
import {PatternService} from '../shared/pattern.service';
import {Capability} from '../../capabilities/shared/capability';
import {CapabilityService} from '../../capabilities/shared/capability.service';
import {SystemService} from '../../systems/shared/system.service';
import {System} from '../../systems/shared/system';
import {PatternInfoComponent} from '../pattern-info/pattern-info.component';
import {CapabilityInfoComponent} from '../../capabilities/capability-info/capability-info.component';
import {SystemInfoComponent} from '../../systems/system-info/system-info.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-pattern-finder',
  templateUrl: './pattern-finder.component.html',
  styleUrls: ['./pattern-finder.component.scss']
})
export class PatternFinderComponent implements OnInit {

  type: 'capability' | 'component';
  attributeSets: AttributeSet[];
  selectedAttributeSetId: string;

  resultPatterns: {
    pattern: Pattern,
    percentage: number
  }[];

  @ViewChild('attributeSelectionComponent') attributeSelectionComponent: AttributeSelectionComponent;

  constructor(private attributeSetService: AttributeSetService,
              private capabilityService: CapabilityService,
              private systemService: SystemService,
              private dialog: MatDialog,
              private patternService: PatternService) {
  }

  ngOnInit(): void {
  }

  async updateType() {
    if (this.type) {
      this.selectedAttributeSetId = null;
      this.attributeSets = await this.attributeSetService.findBy(this.type, 'type') as AttributeSet[];
      if (this.attributeSets.length === 1) {
        this.selectedAttributeSetId = this.attributeSets[0].id;
      }
    }
  }

  async find() {
    this.resultPatterns = [];
    const searchSpecification = this.attributeSelectionComponent.attributeSelection as AttributeSelection[];
    const patterns = await this.patternService.all() as Pattern[];
    for (const pattern of patterns) {

      // compare search specification with technical context of each pattern
      const percentage = AttributeSetService.CompareAttributeSelection(searchSpecification, (this.type === 'capability') ? pattern.capabilitySelection : pattern.componentSelection);
      if (percentage > 0) {
        this.resultPatterns.push({
          pattern,
          percentage
        });
      }
    }
    // Sort results by percentage of matching
    this.resultPatterns.sort((a, b) => b.percentage - a.percentage);
  }

  showPatternInfo(event, pattern: Pattern) {
    event.stopPropagation();
    this.dialog.open(PatternInfoComponent, {
      data: {pattern},
    });
  }

  showElementInfo(event, element: Capability | System) {
    event.stopPropagation();
    if (this.type === 'capability') {
      this.dialog.open(CapabilityInfoComponent, {
        data: {capability: element as Capability}
      });
    } else {
      this.dialog.open(SystemInfoComponent, {
        data: {system: element as System}
      });
    }
  }

}
