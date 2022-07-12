import {Component, Inject, OnInit} from '@angular/core';
import {Case} from '../../cases/shared/case';
import {SystemService} from '../shared/system.service';
import {System} from '../shared/system';
import {ActivatedRoute, Router} from '@angular/router';
import {CaseService} from '../../cases/shared/case.service';
import {Capability} from '../../capabilities/shared/capability';
import {CapabilityService} from '../../capabilities/shared/capability.service';
import {CapabilityInfoComponent} from '../../capabilities/capability-info/capability-info.component';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-build-relation',
  templateUrl: './build-relation.component.html',
  styleUrls: ['./build-relation.component.scss']
})
export class BuildRelationComponent implements OnInit {

  public system: System
  relations: {
    case: Case;
    relevantSystem: number;
    relevantCircumstances: number[];
    relatedCapabilities: Capability[];
  }[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private caseService: CaseService,
    private capabilityService: CapabilityService,
    private dialog: MatDialog,
    private systemService: SystemService) {

  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.system = (await this.systemService.get(id)) as System;

      const capabilities = (await this.capabilityService.all()) as Capability[] || [];
      const cases = (await this.caseService.all()) as Case[];

      // now iterate over all relevant systems and find relations to capabilitites
      for (const baseSystem of (this.system.basedOnSystems || [])) {
        const relevantCase = cases.find(i => i.id === baseSystem.case);
        const relevantCircumstances: number[] = [];
        let relatedCapabilities: Capability[] = [];
        for (let i = 0; i < relevantCase.circumstances.length; i++) {
          if ((relevantCase.circumstances[i].systems || []).includes(baseSystem.index)) {
            relevantCircumstances.push(i); // found fitting circumstance!

            // now find actual capabilities that belong to this circumstance
            relatedCapabilities =[...relatedCapabilities, ...capabilities.filter(ci =>
              (ci.basedOnCircumstances || []).filter(j => j.case === relevantCase.id && j.index === i).length > 0
            )];
          }
        }
        // one relation per base system
        if (relatedCapabilities.length > 0) {
          this.relations.push({
            case: relevantCase,
            relevantSystem: baseSystem.index,
            relevantCircumstances: relevantCircumstances,
            relatedCapabilities: relatedCapabilities
          })
        }
      }
    } else {
      await this.router.navigateByUrl('/components');
    }
  }

  showCapabilityInfo(event, capability: Capability) {
    event.stopPropagation();
    this.dialog.open(CapabilityInfoComponent, {
      data: {capability},
    });
  }

}
