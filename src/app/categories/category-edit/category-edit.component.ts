import { Component, OnInit } from '@angular/core';
import {Category} from '../shared/category';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../shared/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {SystemService} from '../../systems/shared/system.service';
import {System} from '../../systems/shared/system';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {

  public category: Category;
  public systems: System[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private systemService: SystemService
  ) {

    // get the id from the path and load category if set
    const id = this.route.snapshot.paramMap.get('id');
    const categoryId: number = Number(id);
    if (id === 'new') {
      this.category = <Category>{name: '', description: ''};
    } else {
      this.categoryService.get(categoryId).subscribe( c => {
        if (c) {
          this.category = <Category> c;
          this.systemService.findFromRelation('categories', categoryId).subscribe(systems => {
            this.systems = systems;
          });
        } else {
          this.category = <Category>{name: '', description: ''};
        }
      });
    }

  }

  ngOnInit() {
  }

  save() {
      this.categoryService.add(this.category).subscribe( () => {
        this.snackBar.open('Category was successfully saved');
        this.router.navigateByUrl('/categories');
      });
  }
}
