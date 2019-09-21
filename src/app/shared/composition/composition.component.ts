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
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-composition',
  templateUrl: './composition.component.html',
  styleUrls: ['./composition.component.scss']
})
export class CompositionComponent implements OnInit {

  // systems and capabilities to visualize, we receive them from the page where this component is embedded
  // we use observables to listen for changes)
  private _relevantSystems = new BehaviorSubject<System[]>(null);
  @Input() set relevantSystems(value: System[]) {
    this._relevantSystems.next(value);
  }

  get relevantSystems() {
    return this._relevantSystems.getValue();
  }

  private _relevantCapabilities = new BehaviorSubject<Capability[]>(null);
  @Input() set relevantCapabilities(value: Capability[]) {
    this._relevantCapabilities.next(value);
  }

  get relevantCapabilities() {
    return this._relevantCapabilities.getValue();
  }

  @Input() showSwitchModes = true;

  // get current configuration
  public capabilities: Capability[];
  public systems: System[];
  public categories: Category[];
  public patterns: Pattern[];
  public products: Product[];

  public relevantPatterns: Pattern[] = [];
  public highlightedSystems: number[] = [];

  public highlightedPatterns: number[] = [];
  public highlightedCapabilities: number[] = [];

  // view config
  public viewMode = 'vertical';

  constructor(private configuration: ConfigurationService,
              private systemService: SystemService,
              private dialog: MatDialog) {

    // load stuff from configuration
    this.configuration.getConfiguration().subscribe(c => {
      this.capabilities = c.capabilities;
      this.systems = c.systems;
      this.categories = c.categories;
      this.patterns = c.patterns;

      // fill categories
      for (const category of this.categories) {
        this.systemService.findFromRelation('categories', category.id).subscribe(systems => {
          category.systems = systems;
        });
      }
    });

    // extract relevant patterns and capabilities from relevant systems
    this._relevantSystems.subscribe(relevantSystems => {
      if (relevantSystems) {
        let patterns: Pattern[] = [];
        let capabilities: Capability[] = [];
        for (const system of relevantSystems) {
          patterns = patterns.concat(system.patterns);
          capabilities = capabilities.concat(system.capabilities);
        }
        // make unique by id
        this.relevantPatterns = patterns.filter((obj, pos, arr) => {
          return arr.map(mapObj => mapObj['id']).indexOf(obj['id']) === pos;
        });
        this.relevantCapabilities = capabilities.filter((obj, pos, arr) => {
          return arr.map(mapObj => mapObj['id']).indexOf(obj['id']) === pos;
        });
      }
    });

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
    console.log(this.highlightedPatterns);
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
        console.log(this.highlightedSystems);
      });
    }
  }

}