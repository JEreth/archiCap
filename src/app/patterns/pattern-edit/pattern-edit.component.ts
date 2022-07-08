import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Pattern} from '../shared/pattern';
import {PatternService} from '../shared/pattern.service';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Configuration, ConfigurationService} from "../../shared/configuration.service";

@Component({
  selector: 'app-pattern-edit',
  templateUrl: './pattern-edit.component.html',
  styleUrls: ['./pattern-edit.component.scss']
})
export class PatternEditComponent implements OnInit {

  public form: UntypedFormGroup;
  public pattern: Pattern = {name: '', description: '', systems: [], capabilities: []};
  public configuration: Configuration;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private patternService: PatternService,
    private snackBar: MatSnackBar,
    private formBuilder: UntypedFormBuilder,
    private configurationService: ConfigurationService
  ) {
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pattern = await this.patternService.get(id) as Pattern || this.pattern;
    }
    this.configuration = await this.configurationService.get();
    this.form = this.formBuilder.group({
      name: [this.pattern.name, Validators.required],
      description: [this.pattern.description],
      systems: [this.pattern.systems],
      capabilities: [this.pattern.capabilities],
    });
  }

  async save() {
    this.pattern = {...this.pattern, ...this.form.value};
    if (await this.patternService.add(this.pattern)) {
      this.snackBar.open('Pattern was successfully saved');
      await this.router.navigateByUrl('/patterns');
    } else {
      this.snackBar.open('There has been an error');
    }
  }

}
