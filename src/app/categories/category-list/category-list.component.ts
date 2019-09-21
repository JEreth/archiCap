import {Component, OnInit} from '@angular/core';
import {Category} from '../shared/category';
import {CategoryService} from '../shared/category.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  public categories: Category[];

  constructor(private categoryService: CategoryService,
              private snackBar: MatSnackBar) {
    this.categoryService.getAllAsArray().subscribe(categories => {
      this.categories = categories;
    });
  }

  ngOnInit() {
  }

  remove(id: number) {
    this.categoryService.remove(id).subscribe(() => {
      this.snackBar.open('Category has been removed');
      this.categoryService.getAllAsArray().subscribe(categories => {
        this.categories = categories;
      });
    });
  }

}
