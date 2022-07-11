import {Component, OnInit, ViewChild} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Case} from '../shared/case';
import {ActivatedRoute, Router} from '@angular/router';
import {CaseService} from '../shared/case.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AttributeSet} from '../../eav/shared/models';
import {Configuration, ConfigurationService} from '../../shared/configuration.service';
import {AttributeSelectionComponent} from '../../eav/attribute-selection/attribute-selection.component';

@Component({
  selector: 'app-circumstance-specify',
  templateUrl: './circumstance-specify.component.html',
  styleUrls: ['./circumstance-specify.component.scss']
})
export class CircumstanceSpecifyComponent implements OnInit {

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
      this.attributeSets = this.configuration.attributeSets.filter(i => i.type === 'capability');

      if (this.ix === null || !this.case.circumstances[this.ix]) {
        this.case.circumstances.push({
          description: '',
          category: this.configuration.categories[0].id,
          attributeSelection: [],
          attributeSet : this.attributeSets[0].id,
          systems: []
        });
        this.ix = this.case.circumstances.length - 1;
      }

      this.form = this.formBuilder.group({
        description: [this.case.circumstances[this.ix].description || '', Validators.required],
        category: [this.case.circumstances[this.ix].category || this.configuration.categories[0].id, Validators.required],
        attributeSet: [this.case.circumstances[this.ix].attributeSet ||  this.attributeSets[0].id, Validators.required],
        systems: [this.case.circumstances[this.ix].systems || []]
      });
    } else {
      await this.router.navigateByUrl('/cases');
    }
  }

  async save() {
    this.case.circumstances[this.ix] = {
      ...this.case.circumstances[this.ix],
      ...this.form.value
    }
    this.case.circumstances[this.ix].attributeSelection = this.attributeSelectionComponent.attributeSelection;
    if (await this.caseService.add(this.case)) {
      this.snackBar.open('Circumstance was successfully saved');
      await this.router.navigateByUrl('/cases/edit/' + this.case.id);
    } else {
      this.snackBar.open('There has been an error.');
    }
  }
}
