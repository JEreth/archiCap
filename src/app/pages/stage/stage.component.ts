import {Component, OnInit} from '@angular/core';
import {Capability} from '../../capabilities/shared/capability';
import {System} from '../../systems/shared/system';
import {ProfileService} from '../../shared/profile.service';
import {SystemService} from '../../systems/shared/system.service';
import {CapabilityService} from '../../capabilities/shared/capability.service';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss']
})
export class StageComponent implements OnInit {

  public capabilities: Capability[] = [];
  public systems: System[] = [];

  constructor(private profile: ProfileService,
              private systemService: SystemService,
              private capabilityService: CapabilityService) {

    this.profile.init().subscribe(() => {
      this.systemService.getMany(this.profile.selectedSystems).subscribe(r => {
        this.systems = r;
      });
      this.capabilityService.getMany(this.profile.selectedCapabilities).subscribe(r => {
        this.capabilities = r;
      });
    });

  }

  ngOnInit() {
  }

}
