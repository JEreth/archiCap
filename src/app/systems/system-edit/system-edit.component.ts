import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {System} from '../shared/system';
import {SystemService} from '../shared/system.service';

@Component({
  selector: 'app-system-edit',
  templateUrl: './system-edit.component.html',
  styleUrls: ['./system-edit.component.scss']
})
export class SystemEditComponent implements OnInit {

  public system: System;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private systemService: SystemService,
    private snackBar: MatSnackBar

  ) {

    // get the id from the path and load system if set
    const id = this.route.snapshot.paramMap.get('id');
    const systemId: number = Number(id);
    if (id === 'new') {
      this.system = <System>{name: '', description: ''};
    } else {
      this.systemService.get(systemId).subscribe( c => {
        if (c) {
          this.system = <System> c;
        } else {
          this.system = <System>{name: '', description: ''};
        }
      });
    }

  }

  ngOnInit() {
  }

  save() {
    this.systemService.add(this.system).subscribe( () => {
      this.snackBar.open('System was successfully saved');
      this.router.navigateByUrl('/components');
    });
  }
}
