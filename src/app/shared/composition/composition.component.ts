import {Component, Input, OnInit} from '@angular/core';
import {ConfigurationService, Configuration} from '../configuration.service';
import {SystemService} from '../../systems/shared/system.service';
import {MatDialog} from '@angular/material/dialog';
import {Profile, ProfileService} from '../profile.service';
import {Category} from '../../categories/shared/category';
import {System} from '../../systems/shared/system';
import {Pattern} from "../../patterns/shared/pattern";

interface StackLayer {
  category: Category;
  systems: System[];
}

@Component({
  selector: 'app-composition',
  templateUrl: './composition.component.html',
  styleUrls: ['./composition.component.scss']
})
export class CompositionComponent implements OnInit {

  // view config
  public viewMode = 'currentStack';
  public stackMode = 'vertical';

  @Input() showAnalyze = false;
  @Input() showLabel = true;
  @Input() showSwitchModes = true;


  // get current configuration
  public configuration: Configuration;
  public profile: Profile;

  // selected stuff
  public highlightedSystems: string[] = [];
  public highlightedPatterns: Pattern[] = [];
  public highlightedCapabilities: string[] = [];

  // other values
  public analyzeResult: any = [];
  public layers: StackLayer[] = [];

  constructor(private configurationService: ConfigurationService,
              private profileService: ProfileService,
              public systemService: SystemService,
              private dialog: MatDialog) {
  }

  async ngOnInit() {
    this.configuration = await this.configurationService.get();
    this.profile = await this.profileService.get();
    for (const c of this.configuration.categories) {
      this.layers.push({
        category: c,
        systems: await this.systemService.findBy(c.id, 'categories') as System[]
      });
    }
  }

  isCurrentSystem(id: string): boolean {
    return false;
    /* return this.availableSystems.map(function (system) {
      return system.id;
    }).includes(id); */
  }

  isDesiredSystem(id: string): boolean {
    return false;
    /* return this.desiredSystems.map(function (system) {
      return system.id;
    }).includes(id); */
  }



  showSystemInformation(system: any) {
    /*const operationDetailPopover = this.dialog.open(SystemInfoComponent, {
      data: {system: system},
    });*/
  }

  async updateHighlightedSystems() {
    /* this.highlightedSystems = this.highlightedPatterns.reduce( (p1, p2) => {
      return p1.systems.concat(p2.systems) as string[];
    }, {systems: []}); */
    /*for (const patternId of this.highlightedPatterns) {
      this.systemService.findFromRelation('patterns', patternId).subscribe(systems => {
        const systemsFiltered = this.highlightedSystems.concat(systems.map(a => a.id));
        this.highlightedSystems = systemsFiltered.filter((v, i, s) => s.indexOf(v) === i);
      });
    }
    for (const capabilityId of this.highlightedCapabilities) {
      this.systemService.findFromRelation('capabilities', capabilityId).subscribe(systems => {
        const systemsFiltered = this.highlightedSystems.concat(systems.map(a => a.id));
        this.highlightedSystems = systemsFiltered.filter((v, i, s) => s.indexOf(v) === i);
      });
    }*/
  }

  // check how configuration and patterns match
  calculateIdentifiedPatterns() {
    /*this.patternService.getAllAsArray().subscribe(allPatterns => {
      const availableSystemIds: number[] = this.availableSystems.map(a => a.id);
      const patternResults: any[] = [];
      for (const pattern of allPatterns) {
        this.systemService.findFromRelation('patterns', pattern.id).subscribe(systemsOfThisPattern => {
          const patternResult = {
            percentage: 0,
            pattern: pattern,
            foundSystems: [],
            missingSystems: []
          };
          for (const system of systemsOfThisPattern) {
            if (availableSystemIds.includes(system.id)) {
              patternResult.foundSystems.push(system);
            } else {
              patternResult.missingSystems.push(system);
            }
          }
          const {length} = systemsOfThisPattern;
          patternResult.percentage = Math.round((patternResult.foundSystems.length / Math.max(1, length)) * 100);
          patternResults.push(patternResult);
        });
      }
      patternResults.sort((r1, r2) => r2.percentage - r1.percentage);
      this.analyzeResult = patternResults;
    });*/
  }

}
