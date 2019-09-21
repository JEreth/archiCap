import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    this.capabilityService.getAllAsArray().subscribe( capabilities => {
      this.capabilities = capabilities;
    });
  }

  ngOnInit() {
  }

  remove(id: number) {
    this.capabilityService.remove(id).subscribe( () => {
      this.snackBar.open('Capability has been removed');
      this.capabilityService.getAllAsArray().subscribe( capabilities => {
        this.capabilities = capabilities;
      });
    });
  }
}
