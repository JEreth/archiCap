import { Component, OnInit } from '@angular/core';
import {Capability} from '../../capabilities/shared/capability';
import {CapabilityService} from '../../capabilities/shared/capability.service';
import {SystemService} from '../../systems/shared/system.service';
import {ProfileService} from '../../shared/profile.service';
import {System} from '../../systems/shared/system';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public selectedSystems: number[];
  public selectedCapabilities: number[]
  public capabilities: Capability[] = [];
  public systems: System[] = [];

  constructor(private capabilityService: CapabilityService,
              private systemService: SystemService,
              private snackBar: MatSnackBar,
              private profile: ProfileService) {

    this.capabilityService.getAllAsArray().subscribe( capabilities => {
      this.capabilities = capabilities;
    });

    this.systemService.getAllAsArray().subscribe( systems => {
      this.systems = systems;
    });

    this.profile.init().subscribe( () => {
      this.selectedSystems = this.profile.selectedSystems;
      this.selectedCapabilities = this.profile.selectedCapabilities;
    });
  }

  ngOnInit() {
  }

  save() {
    this.profile.selectedSystems = this.selectedSystems;
    this.profile.selectedCapabilities = this.selectedCapabilities;
    this.profile.persist().subscribe( () => {
      this.snackBar.open('Profile was saved');
    });
  }

}
