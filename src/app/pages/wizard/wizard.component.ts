import {Component, OnInit} from '@angular/core';
import {Capability} from '../../capabilities/shared/capability';
import {CapabilityService} from '../../capabilities/shared/capability.service';
import {ProfileService} from '../../shared/profile.service';
import {SystemService} from '../../systems/shared/system.service';
import {System} from '../../systems/shared/system';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {

  public selectedSystems: number[];
  public selectedCapabilities: number[];
  public capabilities: Capability[] = [];
  public systems: System[] = [];

  public working = true;

  constructor(private capabilityService: CapabilityService,
              private systemService: SystemService,
              private profile: ProfileService) {

    this.capabilityService.getAllAsArray().subscribe(capabilities => {
      this.capabilities = capabilities;
    });

    this.systemService.getAllAsArray().subscribe(systems => {
      this.systems = systems;
    });

    this.profile.init().subscribe(() => {
      this.selectedSystems = this.profile.selectedSystems;
      this.selectedCapabilities = this.profile.selectedCapabilities;
      this.working = false;
    });

  }

  save() {
    this.working = true;
    this.profile.selectedSystems = this.selectedSystems;
    this.profile.selectedCapabilities = this.selectedCapabilities;
    this.profile.persist().subscribe(() => {
      this.working = false;
    });
  }

  ngOnInit() {
  }

}
