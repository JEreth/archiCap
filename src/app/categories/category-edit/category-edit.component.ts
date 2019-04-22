import { Component, OnInit } from '@angular/core';
import {Category} from '../shared/category';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../shared/category.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {

  public category: Category;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar

  ) {

    // get the id from the path and load categoriy if set
    const id = this.route.snapshot.paramMap.get('id');
    const categoryId: number = Number(id);
    if (id === 'new' || !categoryId) {
      this.category = <Category>{name: '', description: ''};
    } else {
      this.category = <Category>{name: '', description: ''};
    }

  }

  ngOnInit() {
  }

  save() {
      this.categoryService.add(this.category).subscribe( () => {
        this.snackBar.open('Category was sucessfully saved');
        this.router.navigateByUrl('/categories');
      });
  }
}
