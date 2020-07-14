import {Component, OnInit} from '@angular/core';
import {Category} from '../shared/category';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../shared/category.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {

  public category: Category = {name: '', description: ''};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
  ) {
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.category = await (this.categoryService.get(id)) as Category;
    }
  }

  async save() {
    if (await this.categoryService.add(this.category)) {
      this.snackBar.open('Capability was successfully saved');
      await this.router.navigateByUrl('/capabilities');
    } else {
      this.snackBar.open('There has been an error.');
    }
  }

}
