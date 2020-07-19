import {Component, OnInit} from '@angular/core';
import {Capability} from '../shared/capability';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CapabilityService} from '../shared/capability.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Configuration, ConfigurationService} from '../../shared/configuration.service';
import {Pattern} from '../../patterns/shared/pattern';
import {PatternService} from '../../patterns/shared/pattern.service';
import {AttributeSet} from '../../eav/shared/models';

@Component({
  selector: 'app-capability-edit',
  templateUrl: './capability-edit.component.html',
  styleUrls: ['./capability-edit.component.scss']
})
export class CapabilityEditComponent implements OnInit {

  public form: FormGroup;
  public capability: Capability = {name: '', description: '', attributeSet: ''};
  public relatedPatters: Pattern[] = [];
  public configuration: Configuration;
  public attributeSets: AttributeSet[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private capabilityService: CapabilityService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private configurationService: ConfigurationService,
    private patternService: PatternService
  ) {
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.capability = (await this.capabilityService.get(id)) as Capability || this.capability;
      this.relatedPatters = await (this.patternService.findBy(id, 'capabilities')) as Pattern[];
    }
    this.configuration = await this.configurationService.get();
    this.attributeSets = this.configuration.attributeSets.filter(i => i.type === 'capability');
    this.form = this.formBuilder.group({
      name: [this.capability.name, Validators.required],
      description: [this.capability.description],
      attributeSet: [this.capability.attributeSet]
    });
  }

  async save() {
    this.capability = {...this.capability, ...this.form.value};
    if (await this.capabilityService.add(this.capability)) {
      // update relations
      await this.patternService.relate(this.relatedPatters, this.capability, 'capabilities');
      this.snackBar.open('Capability was successfully saved');
      await this.router.navigateByUrl('/capabilities');
    } else {
      this.snackBar.open('There has been an error.');
    }
  }

}
