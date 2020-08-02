import {Component, Input, OnInit} from '@angular/core';
import {Attribute, AttributeSelection, AttributeSet} from '../shared/models';
import {AttributeSetService} from '../shared/attribute-set.service';
import {AttributeService} from '../shared/attribute.service';
import {EntityService} from '../../shared/entity.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Location} from '@angular/common';

@Component({
  selector: 'app-attribute-selection',
  templateUrl: './attribute-selection.component.html',
  styleUrls: ['./attribute-selection.component.scss']
})
export class AttributeSelectionComponent implements OnInit {

  @Input() entityId: string;
  _attributeSetId: string;
  @Input() attributeSelection: AttributeSelection[] = [];
  @Input() persistService: EntityService;
  @Input() readonly = false;

  // Getter and setter to listen on update
  get attributeSetId(): string {
    return this._attributeSetId;
  }

  @Input()
  set attributeSetId(val: string) {
    this._attributeSetId = val;
    this.update();
  }

  attributeSet: AttributeSet;
  attributes: Attribute[];

  constructor(private attributeSetService: AttributeSetService,
              private snackBar: MatSnackBar,
              private _location: Location,
              private attributeService: AttributeService) {
  }

  async ngOnInit() {
    await this.update();
  }

  async update() {
    this.attributeSet = await this.attributeSetService.get(this.attributeSetId) as AttributeSet;
    this.attributes = await this.attributeService.findBy(this.attributeSet.attributes) as Attribute[];
  }

  isSelected(attributeId: string, value: string): boolean {
    return this.attributeSelection.filter(i => {
      return (i.attribute === attributeId && i.value === value);
    }).length > 0;
  }

  select(attributeId: string, value: string) {
    if (this.readonly) {
      return;
    }
    this.attributeSelection = this.attributeSelection.filter(i => {
      return (i.attribute !== attributeId);
    });
    this.attributeSelection.push({attribute: attributeId, value: value});
  }

  async save() {
    const entity = await this.persistService.get(this.entityId) as any;
    entity.attributeSelection = this.attributeSelection;
    if (await this.persistService.update(entity)) {
      this.snackBar.open('Selection was successfully saved');
      this._location.back();
    } else {
      this.snackBar.open('There has been an error.');
    }
  }

}
