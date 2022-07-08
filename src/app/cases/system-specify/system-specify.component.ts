import {Component, OnInit, ViewChild} from '@angular/core';
import {AttributeSelectionComponent} from '../../eav/attribute-selection/attribute-selection.component';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Case} from '../shared/case';
import {AttributeSet} from '../../eav/shared/models';
import {Configuration, ConfigurationService} from '../../shared/configuration.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CaseService} from '../shared/case.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-system-specify',
  templateUrl: './system-specify.component.html',
  styleUrls: ['./system-specify.component.scss']
})
export class SystemSpecifyComponent implements OnInit {

  @ViewChild('attributeSelection') attributeSelectionComponent: AttributeSelectionComponent;

  public form: UntypedFormGroup;
  public case: Case;
  public ix: number;

  public attributeSets: AttributeSet[] = [];
  public configuration: Configuration;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private caseService: CaseService,
              private snackBar: MatSnackBar,
              private configurationService: ConfigurationService,
              private formBuilder: UntypedFormBuilder) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.case = await (this.caseService.get(id)) as Case || this.case;
      this.ix = this.route.snapshot.paramMap.get('index') ? Number(this.route.snapshot.paramMap.get('index')) : null;

      this.configuration = await this.configurationService.get();
      this.attributeSets = this.configuration.attributeSets.filter(i => i.type === 'component');

      if (this.ix === null || !this.case.systems[this.ix]) {
        this.case.systems.push({
          description: '',
          attributeSelection: [],
          attributeSet : this.attributeSets[0].id
        });
        this.ix = this.case.systems.length - 1;
      }

      this.form = this.formBuilder.group({
        description: [this.case.systems[this.ix].description || '', Validators.required],
        attributeSet: [this.case.systems[this.ix].attributeSet ||  this.attributeSets[0].id, Validators.required]
      });
    } else {
      await this.router.navigateByUrl('/cases');
    }
  }

  async save() {
    this.case.systems[this.ix] = {
      ...this.case.systems[this.ix],
      ...this.form.value
    }
    this.case.systems[this.ix].attributeSelection = this.attributeSelectionComponent.attributeSelection;
    if (await this.caseService.add(this.case)) {
      this.snackBar.open('System was successfully saved');
      await this.router.navigateByUrl('/cases/edit/' + this.case.id);
    } else {
      this.snackBar.open('There has been an error.');
    }
  }

  updateQuantificationModel() {
    const v = this.form.value;
    this.case.systems[this.ix].attributeSelection = [];
    this.case.systems[this.ix].attributeSet = v.attributeSet;
  }

}
