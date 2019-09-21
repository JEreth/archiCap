import {Component, OnInit} from '@angular/core';
import {Capability} from '../../capabilities/shared/capability';
import {System} from '../../systems/shared/system';
import {ConfigurationService} from '../../shared/configuration.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  public capabilities: Capability[] = [];
  public systems: System[] = [];

  constructor(private configuration: ConfigurationService) {
    this.configuration.getConfiguration().subscribe(config => {
      this.capabilities = config.capabilities;
      this.systems = config.systems;
    });
  }

  ngOnInit() {
  }

}
