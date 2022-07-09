import {Component, OnInit} from '@angular/core';
import {Case} from '../shared/case';
import {ActivatedRoute, Router} from '@angular/router';
import {CaseService} from '../shared/case.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-case-edit',
  templateUrl: './case-edit.component.html',
  styleUrls: ['./case-edit.component.scss']
})
export class CaseEditComponent implements OnInit {

  public form: UntypedFormGroup;
  public case: Case = {name: '', description: '', circumstances: [], systems: []};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private caseService: CaseService,
    private snackBar: MatSnackBar,
    private formBuilder: UntypedFormBuilder
  ) {
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.case = await (this.caseService.get(id)) as Case || this.case;
      console.log(this.case);
    }
    this.form = this.formBuilder.group({
      name: [this.case.name, Validators.required],
      description: [this.case.description, Validators.required]
    });
  }

  async save() {
    this.case = {...this.case, ...this.form.value};
    if (await this.caseService.add(this.case)) {
      this.snackBar.open('Case was successfully saved');
      await this.router.navigateByUrl('/cases');
    } else {
      this.snackBar.open('There has been an error.');
    }
  }

  async removeCircumstance(ix: number) {
    this.case.circumstances.splice(ix, 1);
    if (await this.caseService.add(this.case)) {
      this.snackBar.open('Case was successfully saved');
    } else {
      this.snackBar.open('There has been an error.');
    }
  }

  async removeSystem(ix: number) {
    this.case.systems.splice(ix, 1);
    if (await this.caseService.add(this.case)) {
      this.snackBar.open('Case was successfully saved');
    } else {
      this.snackBar.open('There has been an error.');
    }
  }

}
