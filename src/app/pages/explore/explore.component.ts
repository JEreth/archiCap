import {Component, OnInit} from '@angular/core';
import {Capability} from '../../capabilities/shared/capability';
import {System} from '../../systems/shared/system';
import {ConfigurationService} from '../../shared/configuration.service';
import {CapabilityService} from "../../capabilities/shared/capability.service";
import {SystemService} from "../../systems/shared/system.service";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  public capabilities: Capability[] = [];
  public systems: System[] = [];

  constructor(private capabilityService: CapabilityService,
              private systemService: SystemService) {

  }

  async ngOnInit() {
    this.capabilities = await this.capabilityService.all() as Capability[];
    this.systems = await this.systemService.all() as System[];
  }

}
