import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {System} from '../shared/system';
import {SystemService} from '../shared/system.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Configuration, ConfigurationService} from '../../shared/configuration.service';
import {Pattern} from "../../patterns/shared/pattern";
import {PatternService} from "../../patterns/shared/pattern.service";

@Component({
  selector: 'app-system-edit',
  templateUrl: './system-edit.component.html',
  styleUrls: ['./system-edit.component.scss']
})
export class SystemEditComponent implements OnInit {

  public form: FormGroup;
  public system: System = {name: '', description: '', categories: [], products: [], substitutions: []};
  public relatedPatters: Pattern[] = [];
  public configuration: Configuration;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private systemService: SystemService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private configurationService: ConfigurationService,
    private patternService: PatternService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.system = (await this.systemService.get(id)) as System || this.system;
      this.relatedPatters = await (this.patternService.findBy(id, 'systems')) as Pattern[];
    }
    this.configuration = await this.configurationService.get();
    this.form = this.formBuilder.group({
      name: [this.system.name, Validators.required],
      description: [this.system.description],
      categories: [this.system.categories],
      products: [this.system.products],
      substitutions: [this.system.substitutions],
    });
  }

  async save() {
    this.system = {...this.system, ...this.form.value};
    if (await this.systemService.add(this.system)) {
      await this.patternService.relate(this.relatedPatters, this.system, 'systems');
      this.snackBar.open('System was successfully saved');
      await this.router.navigateByUrl('/components');
    } else {
      this.snackBar.open('There has been an error');
    }
  }
}
