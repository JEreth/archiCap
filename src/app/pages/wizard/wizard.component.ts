import {Component, OnInit} from '@angular/core';
import {Profile, ProfileService} from '../../shared/profile.service';
import {Configuration, ConfigurationService} from '../../shared/configuration.service';
import {MatStepper} from "@angular/material/stepper";
import {SystemService} from "../../systems/shared/system.service";
import {System} from "../../systems/shared/system";
import {Capability} from '../../capabilities/shared/capability';
import {CapabilityInfoComponent} from '../../capabilities/capability-info/capability-info.component';
import {SystemInfoComponent} from '../../systems/system-info/system-info.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {

  profile: Profile;
  configuration: Configuration;

  constructor(private configurationService: ConfigurationService,
              private systemService: SystemService,
              private dialog: MatDialog,
              private profileService: ProfileService) {
  }

  async save() {
    await this.profileService.persist();
  }

  async ngOnInit() {
    this.profile = await this.profileService.get();
    this.configuration = await this.configurationService.get();
  }

  async next(stepper: MatStepper) {
    await this.save();
    stepper.next();
  }

  async back(stepper: MatStepper) {
    await this.save();
    stepper.previous();
  }

  // select components by selected products
  async suggestComponents() {
    const systems: System[] = await this.systemService.findBy(this.profile.products, 'products') as System[];
    this.profile.systems = systems.map(i => i.id);
  }

  showCapabilityInfo(event, capability: Capability) {
    event.stopPropagation();
    this.dialog.open(CapabilityInfoComponent, {
      data: {capability},
    });
  }

  showSystemInfo(event, system: System) {
    event.stopPropagation();
    this.dialog.open(SystemInfoComponent, {
      data: {system: system},
    });
  }

}
