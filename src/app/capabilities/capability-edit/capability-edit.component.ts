import {Component, OnInit} from '@angular/core';
import {Capability} from '../shared/capability';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CapabilityService} from '../shared/capability.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-capability-edit',
  templateUrl: './capability-edit.component.html',
  styleUrls: ['./capability-edit.component.scss']
})
export class CapabilityEditComponent implements OnInit {

  public form: FormGroup;
  public capability: Capability = {name: '', description: ''};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private capabilityService: CapabilityService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.capability = (await this.capabilityService.get(id)) as Capability || this.capability;
    }
    this.form = this.formBuilder.group({
      name: [this.capability.name, Validators.required],
      description: [this.capability.description]
    });
  }

  async save() {
    this.capability = {...this.capability, ...this.form.value};
    if (await this.capabilityService.add(this.capability)) {
      this.snackBar.open('Capability was successfully saved');
      await this.router.navigateByUrl('/capabilities');
    } else {
      this.snackBar.open('There has been an error.');
    }
  }

}
