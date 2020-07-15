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
  }

  async ngOnInit() {
    await this.update();
  }

  async update() {
    this.categories = (await this.categoryService.all()) as Category[];
  }

  async remove(id: string) {
    if (await this.categoryService.remove(id)) {
      await this.update();
      this.snackBar.open('Category has been removed');
    } else {
      this.snackBar.open('There has been an error');
    }
  }

}
