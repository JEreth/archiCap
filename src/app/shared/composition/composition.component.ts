import {Component, Input, OnInit} from '@angular/core';
import {System} from '../../systems/shared/system';
import {Capability} from '../../capabilities/shared/capability';
import {Category} from '../../categories/shared/category';
import {Pattern} from '../../patterns/shared/pattern';
import {Product} from '../../products/shared/product';
import {ConfigurationService} from '../configuration.service';
import {SystemService} from '../../systems/shared/system.service';
import {MatDialog} from '@angular/material/dialog';
import {SystemInfoComponent} from '../../systems/shared/system-info/system-info.component';
import {PatternService} from '../../patterns/shared/pattern.service';
import {CapabilityService} from '../../capabilities/shared/capability.service';
import {ProfileService} from '../profile.service';

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
  public capabilities: Capability[];
  public systems: System[];
  public categories: Category[];
  public patterns: Pattern[];
  public products: Product[];

  // capabilities and patterns that are available
  public availableSystems: System[] = [];
  public availablePatterns: Pattern[] = [];
  public availableCapabilities: Capability[] = [];
  public desiredCapabilities: Capability[] = [];
  public desiredSystems: System[] = [];

  // selected stuff
  public highlightedSystems: number[] = [];
  public highlightedPatterns: number[] = [];
  public highlightedCapabilities: number[] = [];

  // other values
  public analyzeResult: any = [];

  constructor(private configuration: ConfigurationService,
              private systemService: SystemService,
              private patternService: PatternService,
              private capabilityService: CapabilityService,
              private profileService: ProfileService,
              private dialog: MatDialog) {

    // load stuff from configuration
    this.configuration.getConfiguration().subscribe(c => {
      this.capabilities = c.capabilities;
      this.systems = c.systems;
      this.patterns = c.patterns;
      this.categories = c.categories;
      for (const category of this.categories) {
        this.systemService.findFromRelation('categories', category.id).subscribe(systems => {
          category.systems = (systems) ? systems : [];
        });
      }
    });

    // extract desired capabilities from profile
    this.profileService.init().subscribe(() => {

      // extract relevant patterns and capabilities from relevant systems
      this.systemService.getMany(this.profileService.selectedSystems).subscribe(selectedSystems => {
        const patterns: Pattern[] = [];
        const capabilities: Capability[] = [];
        if (selectedSystems) {
          for (const system of selectedSystems) {
            for (const pattern of system.patterns) {
              if (pattern) {
                patterns.push(pattern);
              }
            }
            for (const capability of system.capabilities) {
              if (capability) {
                capabilities.push(capability);
              }
            }
          }
        }
        // make unique by id
        this.availablePatterns = patterns.filter((obj, pos, arr) => {
          return arr.map(mapObj => mapObj['id']).indexOf(obj['id']) === pos;
        });
        this.availableCapabilities = capabilities.filter((obj, pos, arr) => {
          return arr.map(mapObj => mapObj['id']).indexOf(obj['id']) === pos;
        });
        
        this.availableSystems = selectedSystems;
        
        // calculate analyze values
        this.calculateIdentifiedPatterns();
      });

      // extract desired capabilities and therefrom desired systems from profile
      this.capabilityService.getMany(this.profileService.selectedCapabilities).subscribe(capabilities => {
        this.desiredCapabilities = capabilities;
        this.systemService.findManyFromRelation('capabilities', this.desiredCapabilities.map(a => a.id)).subscribe(systems => {
          this.desiredSystems = systems;
        });
      });
    });

  }

  isCurrentSystem(id: number): boolean {
    return this.availableSystems.map(function (system) {
      return system.id;
    }).includes(id);
  }

  isDesiredSystem(id: number): boolean {
    return this.desiredSystems.map(function (system) {
      return system.id;
    }).includes(id);
  }

  ngOnInit() {
  }

  showSystemInformation(system: System) {
    const operationDetailPopover = this.dialog.open(SystemInfoComponent, {
      data: {system: system},
    });
  }

  updateHighlightedSystems() {
    this.highlightedSystems = [];
    for (const patternId of this.highlightedPatterns) {
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
    }
  }

  // check how configuration and patterns match
  calculateIdentifiedPatterns() {
    this.patternService.getAllAsArray().subscribe(allPatterns => {
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
    });
  }

}
