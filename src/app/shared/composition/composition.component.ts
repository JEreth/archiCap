import {Component, Input, OnInit} from '@angular/core';
import {System} from '../../systems/shared/system';
import {Capability} from '../../capabilities/shared/capability';
import {Category} from '../../categories/shared/category';
import {Pattern} from '../../patterns/shared/pattern';
import {Product} from '../../products/shared/product';
import {ConfigurationService} from '../configuration.service';
import {SystemService} from '../../systems/shared/system.service';
import {MatDialog} from '@angular/material';
import {SystemInfoComponent} from '../../systems/shared/system-info/system-info.component';

@Component({
  selector: 'app-composition',
  templateUrl: './composition.component.html',
  styleUrls: ['./composition.component.scss']
})
export class CompositionComponent implements OnInit {

  // systems and capabilities to visualize, we receive them from the page where this component is embeded
  @Input() relevantSystems: System[];
  @Input() relevantCapabilities: Capability[];
  @Input() showSwitchModes = true;

  // get current configuration
  public capabilities: Capability[];
  public systems: System[];
  public categories: Category[];
  public patterns: Pattern[];
  public products: Product[];

  // view config
  public viewMode = 'vertical';

  constructor(private configuration: ConfigurationService,
              private systemService: SystemService,
              private dialog: MatDialog) {

    // load stuff from configuration
    this.configuration.getConfiguration().subscribe( c => {
      this.capabilities = c.capabilities;
      this.systems = c.systems;
      this.categories = c.categories;
      this.patterns = c.patterns;

      // fill categories
      for (const category of this.categories) {
        this.systemService.findFromRelation('categories', category.id ).subscribe(systems => {
          category.systems = systems;
        });
      }

    });

  }

  ngOnInit() {
  }

  showSystemInformation(system: System) {
    const operationDetailPopover = this.dialog.open(SystemInfoComponent, {
      data: { system: system },
    });

  }

}
