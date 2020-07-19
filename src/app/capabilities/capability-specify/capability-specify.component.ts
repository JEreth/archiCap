import {Component, OnInit} from '@angular/core';
import {Capability} from '../shared/capability';
import {ActivatedRoute} from '@angular/router';
import {CapabilityService} from '../shared/capability.service';

@Component({
  selector: 'app-capability-specify',
  templateUrl: './capability-specify.component.html',
  styleUrls: ['./capability-specify.component.scss']
})
export class CapabilitySpecifyComponent implements OnInit {

  public capability: Capability;

  constructor(private route: ActivatedRoute,
              public capabilityService: CapabilityService) {
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.capability = (await this.capabilityService.get(id)) as Capability || this.capability;
      this.capability.attributeSelection = (this.capability.attributeSelection) ? this.capability.attributeSelection : [];
    }
  }

}
