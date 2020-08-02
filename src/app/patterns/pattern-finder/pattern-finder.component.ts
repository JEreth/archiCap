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
    matchingElements: {
      element: Capability | System,
      percentage: number
    }[]
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
    const pattern = await this.patternService.all() as Pattern[];
    for (const p of pattern) {

      // Find capabilites or systems of this pattern
      const patternElements = (this.type === 'capability') ?
        (await this.capabilityService.findBy(p.capabilities)) as Capability[] :
        (await this.systemService.findBy(p.systems)) as System[];

      const matchingElements = [];
      for (const element of patternElements) {
        // If element has same attribute set as searched
        if (element.attributeSet) {
          // compare how good we match
          const intersectionCount = element.attributeSelection.filter(s => searchSpecification.find(i =>
            i.attribute === s.attribute && i.value === s.value
          )).length;
          const percentage = Math.round((intersectionCount / Math.max(1, element.attributeSelection.length)) * 100);
          matchingElements.push({
            element,
            percentage
          });
        }
      }

      if (matchingElements.length > 0 && matchingElements.map(i => i.percentage).reduce((a, b) => a + b, 0) > 0) {
        this.resultPatterns.push({
          pattern: p,
          matchingElements: matchingElements
        });
      }
    }
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
