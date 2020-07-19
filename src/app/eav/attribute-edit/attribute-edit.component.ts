import {Component, OnInit} from '@angular/core';
import {Attribute} from '../shared/models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AttributeService} from '../shared/attribute.service';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Location} from '@angular/common';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-attribute-edit',
  templateUrl: './attribute-edit.component.html',
  styleUrls: ['./attribute-edit.component.scss']
})
export class AttributeEditComponent implements OnInit {

  form: FormGroup;
  attribute: Attribute = {name: '', description: '', values: [], type: 'capability'};
  type = 'capability';

  constructor(private route: ActivatedRoute,
              private attributeService: AttributeService,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private _location: Location) {
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.type = this.route.snapshot.paramMap.get('type');
    this.attribute.type = (this.type) ? this.type as 'capability' | 'component' : this.attribute.type;

    if (id) {
      this.attribute = (await this.attributeService.get(id)) as Attribute || this.attribute;
    }

    this.form = this.formBuilder.group({
      name: [this.attribute.name, Validators.required],
      description: [this.attribute.description]
    });
  }

  async save() {
    this.attribute = {...this.attribute, ...this.form.value};
    if (await this.attributeService.add(this.attribute)) {
      this.snackBar.open('Attribute was successfully saved');
      this._location.back();
    } else {
      this.snackBar.open('There has been an error.');
    }
  }

  back() {
    this._location.back();
  }

  addValue() {
    this.attribute.values.push('');
  }

  removeValue(index: number) {
    this.attribute.values.splice(index, 1);
  }

  async dropValue(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.attribute.values, event.previousIndex, event.currentIndex);
  }

  trackByFn(index: any, item: any) {
    return index;
  }
}
