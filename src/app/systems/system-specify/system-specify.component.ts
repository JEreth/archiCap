import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SystemService} from '../shared/system.service';
import {System} from '../shared/system';

@Component({
  selector: 'app-system-specify',
  templateUrl: './system-specify.component.html',
  styleUrls: ['./system-specify.component.scss']
})
export class SystemSpecifyComponent implements OnInit {

  system: System;

  constructor(private route: ActivatedRoute,
              public systemService: SystemService) {
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.system = (await this.systemService.get(id)) as System || this.system;
      this.system.attributeSelection = (this.system.attributeSelection) ? this.system.attributeSelection : [];
    }
  }

}
