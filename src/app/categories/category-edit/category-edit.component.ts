import {Component, OnInit} from '@angular/core';
import {Category} from '../shared/category';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../shared/category.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {System} from "../../systems/shared/system";
import {SystemService} from "../../systems/shared/system.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Configuration, ConfigurationService} from "../../shared/configuration.service";

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {

  public form: FormGroup;
  public category: Category = {name: '', description: ''};
  public relatedSystems: System[] = [];
  public configuration: Configuration;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private systemService: SystemService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private configurationService: ConfigurationService
  ) {
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.category = await (this.categoryService.get(id)) as Category || this.category;
      this.relatedSystems = await (this.systemService.findBy(id, 'categories')) as System[];
    }
    this.configuration = await this.configurationService.get();
    this.form = this.formBuilder.group({
      name: [this.category.name, Validators.required],
      description: [this.category.description]
    });
  }

  async save() {
    this.category = {...this.category, ...this.form.value};
    if (await this.categoryService.add(this.category)) {
      // update relations
      await this.systemService.relate(this.relatedSystems, this.category, 'categories');
      return;
      this.snackBar.open('Category was successfully saved');
      await this.router.navigateByUrl('/categories');
    } else {
      this.snackBar.open('There has been an error.');
    }
  }

}
