import { Component, OnInit } from '@angular/core';
import {Capability} from '../../capabilities/shared/capability';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {CapabilityService} from '../shared/capability.service';

@Component({
  selector: 'app-capability-edit',
  templateUrl: './capability-edit.component.html',
  styleUrls: ['./capability-edit.component.scss']
})
export class CapabilityEditComponent implements OnInit {

  public capability: Capability;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private capabilityService: CapabilityService,
    private snackBar: MatSnackBar

  ) {

    // get the id from the path and load capability if set
    const id = this.route.snapshot.paramMap.get('id');
    const capabilityId: number = Number(id);
    if (id === 'new') {
      this.capability = <Capability>{name: '', description: ''};
    } else {
      this.capabilityService.get(capabilityId).subscribe( c => {
        if (c) {
          this.capability = <Capability> c;
        } else {
          this.capability = <Capability>{name: '', description: ''};
        }
      });
    }
  }

  ngOnInit() {
  }

  save() {
    this.capabilityService.add(this.capability).subscribe( () => {
      this.snackBar.open('Capability was sucessfully saved');
      this.router.navigateByUrl('/capabilities');
    });
  }

}
