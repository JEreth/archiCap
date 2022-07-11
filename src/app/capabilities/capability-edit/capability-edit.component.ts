import {Component, OnInit} from '@angular/core';
import {Capability} from '../shared/capability';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CapabilityService} from '../shared/capability.service';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Configuration, ConfigurationService} from '../../shared/configuration.service';
import {Pattern} from '../../patterns/shared/pattern';
import {PatternService} from '../../patterns/shared/pattern.service';
import {AttributeSet} from '../../eav/shared/models';
import {CaseService} from '../../cases/shared/case.service';
import {Case} from '../../cases/shared/case';

@Component({
  selector: 'app-capability-edit',
  templateUrl: './capability-edit.component.html',
  styleUrls: ['./capability-edit.component.scss']
})
export class CapabilityEditComponent implements OnInit {

  public form: UntypedFormGroup;
  public capability: Capability = {name: '', description: '', attributeSet: null, attributeSelection: [], category: null};
  public relatedPatters: Pattern[] = [];
  public configuration: Configuration;
  public attributeSets: AttributeSet[] = [];

  public allCircumstances: {
    label: string;
    value: {
      case: string
      index: number;
    };
  }[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private capabilityService: CapabilityService,
    private snackBar: MatSnackBar,
    private formBuilder: UntypedFormBuilder,
    private configurationService: ConfigurationService,
    private patternService: PatternService,
    private caseService: CaseService
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
    const cases = (await this.caseService.all()) as Case[];
    for (const c of cases) {
      for (const [i, s] of c.circumstances.entries()) {
        this.allCircumstances.push({
          label: c.name + ': ' + s.description,
          value: {
            case: c.id,
            index: i
          }
        });
      }
    }

    this.form = this.formBuilder.group({
      name: [this.capability.name, Validators.required],
      description: [this.capability.description],
      category: [this.capability.category || this.configuration.categories[0].id],
      attributeSet: [this.capability.attributeSet || this.attributeSets[0].id],
      basedOnCircumstances: [this.capability.basedOnCircumstances || []]
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

  selectedBasedOn(value: {
    case: string
    index: number;
  }): boolean {
    return this.capability.basedOnCircumstances.filter(i => i.case === value.case && i.index === value.index).length > 0
  }


}
