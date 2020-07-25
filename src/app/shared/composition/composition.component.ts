import {Component, Input, OnInit} from '@angular/core';
import {ConfigurationService, Configuration} from '../configuration.service';
import {SystemService} from '../../systems/shared/system.service';
import {MatDialog} from '@angular/material/dialog';
import {Profile, ProfileService} from '../profile.service';
import {Category} from '../../categories/shared/category';
import {System} from '../../systems/shared/system';
import {Pattern} from '../../patterns/shared/pattern';
import {PatternService} from '../../patterns/shared/pattern.service';
import {SystemInfoComponent} from '../../systems/system-info/system-info.component';
import {Capability} from '../../capabilities/shared/capability';
import {CapabilityInfoComponent} from '../../capabilities/capability-info/capability-info.component';
import {PatternInfoComponent} from '../../patterns/pattern-info/pattern-info.component';

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
  configuration: Configuration;
  profile: Profile;

  // selected stuff
  highlightedSystems: string[] = [];
  highlightedPatterns: Pattern[] = [];
  highlightedCapabilities: string[] = [];

  // other values
  public analyzeResult: any = [];
  public layers: StackLayer[] = [];

  constructor(private configurationService: ConfigurationService,
              private profileService: ProfileService,
              private patternService: PatternService,
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


  showSystemInfo(event, system: System) {
    event.stopPropagation();
    this.dialog.open(SystemInfoComponent, {
      data: {system: system},
    });
  }

  showPatternInfo(event, pattern: Pattern) {
    event.stopPropagation();
    this.dialog.open(PatternInfoComponent, {
      data: {pattern},
    });
  }

  showCapabilityInfo(event, capability: Capability) {
    event.stopPropagation();
    this.dialog.open(CapabilityInfoComponent, {
      data: {capability},
    });
  }

  async updateHighlightedSystems() {
    this.highlightedPatterns = await this.patternService.findBy(this.highlightedSystems, 'systems') as Pattern[];
    this.highlightedCapabilities = this.highlightedPatterns.map(i => i.capabilities).reduce((a, b) => a.concat(b), []);
  }

  async updateHighlightedPatterns() {
    this.highlightedCapabilities = this.highlightedPatterns.map(i => i.capabilities).reduce((a, b) => a.concat(b), []);
    this.highlightedSystems = this.highlightedPatterns.map(i => i.systems).reduce((a, b) => a.concat(b), []);
  }

  async updateHighlightedCapabilities() {
    this.highlightedPatterns = await this.patternService.findBy(this.highlightedCapabilities, 'capabilities') as Pattern[];
    this.highlightedSystems = this.highlightedPatterns.map(i => i.systems).reduce((a, b) => a.concat(b), []);
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
