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
import {Product} from '../../products/shared/product';
import {ProductInfoComponent} from '../../products/product-info/product-info.component';
import {CapabilityService} from '../../capabilities/shared/capability.service';
import {ProductService} from '../../products/shared/product.service';

interface StackLayer {
  category: Category;
  patterns: Pattern[];
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

  // get current configuration
  configuration: Configuration;
  profile: Profile;

  // selected elements
  highlightedSystems: string[] = [];
  highlightedPatterns: string[] = [];
  highlightedCapabilities: string[] = [];
  highlightedProducts: string[] = [];

  // other values
  //desiredPatt: string[] = [];
  possibleCapabilites: Capability[] = [];
  desiredCapabilites: Capability[] = [];
  analyzeResult: {
    pattern: Pattern,
    percentage: number
  }[] = [];
  layers: StackLayer[] = [];

  constructor(private configurationService: ConfigurationService,
              private profileService: ProfileService,
              private patternService: PatternService,
              private capabilityService: CapabilityService,
              private productService: ProductService,
              private systemService: SystemService,
              private dialog: MatDialog) {
  }

  async ngOnInit() {
    await this.updateStage();
    await this.analyze();
  }

  // Get data for stage
  async updateStage() {
    const mode = (this.showAnalyze) ? this.viewMode : 'explore';

    const c = await this.configurationService.get();
    this.profile = await this.profileService.get();
    // this.desiredPatterns = [];

    // Filter configuration
    if (mode === 'currentStack') {
      c.patterns = ((await this.patternService.all() || []) as Pattern[]).filter(p => this.isCurrentPattern(p));
    } else if (mode === 'desiredCapabilities') {
      // Desired stack, show patterns that you should implement, i.e. by capabilities
      c.patterns = ((await this.patternService.all() || []) as Pattern[]).filter(p => this.isDesiredPattern(p));
    } else if (mode === 'compare' || mode === 'analyze') {
      // Compare and show both existing and desired stack, show all and highlight
      c.patterns = ((await this.patternService.all() || []) as Pattern[]).filter(p => this.isCurrentPattern(p) || this.isDesiredPattern(p));
    }

    // find relevant relations
    const systemIds = c.patterns.map(i => i.systems).reduce((a, b) => a.concat(b), []);
    c.systems = await this.systemService.findBy(systemIds) as System[];
    const capabilityIds = c.patterns.map(i => i.capabilities).reduce((a, b) => a.concat(b), []);
    c.capabilities = await this.capabilityService.findBy(capabilityIds) as Capability[];
    const productsIds = c.systems.map(i => i.products).reduce((a, b) => a.concat(b), []);
    c.products = await this.productService.findBy(productsIds) as Product[];


    // fill layers with relevant patterns
    this.layers = [];
    // const availablePatternIds = c.patterns.map(i => i.id);
    for (const cat of c.categories) {
      this.layers.push({
        category: cat,
        patterns: c.patterns.filter(p => p.categories.includes(cat.id))
      });
    }


    this.configuration = c;
  }

  // Is implemented pattern, i.e. with implemented component (and capability)
  isCurrentPattern(pattern: Pattern): boolean {
    let hasComponent = false;
    // let hasCapability = false;
    for (const s of pattern.systems) {
      if (this.profile && this.profile.systems && this.profile.systems.includes(s)) {
        hasComponent = true;
      }
    }
    /* for (const s of pattern.capabilities) {
      if (this.profile.capabilities.includes(s)) {
        hasCapability = true;
      }
    } */
    return hasComponent; // && hasCapability;
  }

  // Is desired pattern, i.e. with capability
  isDesiredPattern(pattern: Pattern): boolean {
    for (const s of pattern.capabilities) {
      if (this.profile && this.profile.capabilities && this.profile.capabilities.includes(s)) {
        return true;
      }
    }
    return false;
  }

  // Is redundant pattern, i.e. no capability (reverse of desired)
  isRedundantPattern(pattern: Pattern): boolean {
    return !this.isDesiredPattern(pattern);
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

  showProductInfo(event, product: Product) {
    event.stopPropagation();
    this.dialog.open(ProductInfoComponent, {
      data: {product},
    });
  }

  async updateHighlightedSystems() {
    this.highlightedPatterns = (await this.patternService.findBy(this.highlightedSystems, 'systems') as Pattern[]).map(i => i.id);
    this.highlightedCapabilities = (await this.patternService.findBy(this.highlightedPatterns) as Pattern[])
      .map(i => i.capabilities).reduce((a, b) => a.concat(b), []);
    this.highlightedProducts = (await this.systemService.findBy(this.highlightedSystems) as System[])
      .map(i => i.products).reduce((a, b) => a.concat(b), []);
  }

  async updateHighlightedPatterns() {
    const patterns = await this.patternService.findBy(this.highlightedPatterns) as Pattern[];
    this.highlightedCapabilities = patterns.map(i => i.capabilities).reduce((a, b) => a.concat(b), []);
    this.highlightedSystems = patterns.map(i => i.systems).reduce((a, b) => a.concat(b), []);
    this.highlightedProducts = (await this.systemService.findBy(this.highlightedSystems) as System[])
      .map(i => i.products).reduce((a, b) => a.concat(b), []);
  }

  async updateHighlightedCapabilities() {
    const patterns = await this.patternService.findBy(this.highlightedCapabilities, 'capabilities') as Pattern[];
    this.highlightedPatterns = patterns.map(i => i.id);
    this.highlightedSystems = patterns.map(i => i.systems).reduce((a, b) => a.concat(b), []);
    this.highlightedProducts = (await this.systemService.findBy(this.highlightedSystems) as System[])
      .map(i => i.products).reduce((a, b) => a.concat(b), []);
  }

  async updateHighlightedProducts() {
    this.highlightedSystems = (await this.systemService.findBy(this.highlightedProducts, 'products') as System[]).map(i => i.id);
    this.highlightedPatterns = (await this.patternService.findBy(this.highlightedSystems, 'systems') as Pattern[]).map(i => i.id);
    this.highlightedCapabilities = (await this.patternService.findBy(this.highlightedPatterns) as Pattern[])
      .map(i => i.capabilities).reduce((a, b) => a.concat(b), []);
  }

  async analyze() {
    await this.calculateIdentifiedPatterns();
    // calculate other stuff
    const patternBySystems = (await this.patternService.findBy(this.profile.systems || [], 'systems') as Pattern[]);
    this.possibleCapabilites = (await this.capabilityService.findBy(patternBySystems.map(i => i.capabilities)
      .reduce((a, b) => a.concat(b), []))) as Capability[];
    this.desiredCapabilites = await this.capabilityService.findBy(this.profile.capabilities) as Capability[];
  }

  // check how configuration and patterns match
  async calculateIdentifiedPatterns() {
    this.analyzeResult = [];
    for (const pattern of (await this.patternService.all()) as Pattern[]) {
      const intersectionCount = pattern.systems.filter(s => (this.profile.systems || []).includes(s)).length;
      const percentage = Math.round((intersectionCount / Math.max(1, pattern.systems.length)) * 100);
      if (percentage > 0) {
        this.analyzeResult.push({
          pattern,
          percentage
        });
      }
    }
  }

}
