import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {System} from '../shared/system';
import {SystemService} from '../shared/system.service';

@Component({
  selector: 'app-system-list',
  templateUrl: './system-list.component.html',
  styleUrls: ['./system-list.component.scss']
})
export class SystemListComponent implements OnInit {

  public systems: System[];

  constructor(private systemService: SystemService,
              private snackBar: MatSnackBar) {
    this.systemService.getAllAsArray().subscribe( systems => {
      this.systems = systems;
    });
  }

  ngOnInit() {
  }

  remove(id: number) {
    this.systemService.remove(id).subscribe( () => {
      this.snackBar.open('System has been removed');
      this.systemService.getAllAsArray().subscribe( systems => {
        this.systems = systems;
      });
    });
  }
}
