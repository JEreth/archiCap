import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
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
  }

  async ngOnInit() {
    await this.update();
  }

  async update() {
    this.systems = (await this.systemService.all()) as System[];
  }

  async remove(id: string) {
    if (await this.systemService.remove(id)) {
      await this.update();
      this.snackBar.open('System has been removed');
    } else {
      this.snackBar.open('There has been an error');
    }
  }
}
