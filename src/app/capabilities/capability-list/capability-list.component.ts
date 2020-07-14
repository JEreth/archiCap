import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CapabilityService} from '../shared/capability.service';
import {Capability} from '../shared/capability';

@Component({
  selector: 'app-capability-list',
  templateUrl: './capability-list.component.html',
  styleUrls: ['./capability-list.component.scss']
})
export class CapabilityListComponent implements OnInit {

  public capabilities: Capability[];

  constructor(private capabilityService: CapabilityService,
              private snackBar: MatSnackBar) {
  }

  async ngOnInit() {
    await this.update();
  }

  async update() {
    this.capabilities = (await this.capabilityService.all()) as Capability[];
  }

  async remove(id: string) {
    await this.capabilityService.remove(id);
    await this.update();
    this.snackBar.open('Capability has been removed');
  }

}
