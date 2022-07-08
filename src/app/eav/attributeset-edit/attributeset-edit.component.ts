import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Configuration, ConfigurationService} from '../../shared/configuration.service';
import {AttributeSetService} from '../shared/attribute-set.service';
import {Attribute, AttributeSet} from '../shared/models';
import {AttributeService} from '../shared/attribute.service';
import {moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-attributeset-edit',
  templateUrl: './attributeset-edit.component.html',
  styleUrls: ['./attributeset-edit.component.scss']
})
export class AttributesetEditComponent implements OnInit {

  id: string;
  type: string;
  form: UntypedFormGroup;
  configuration: Configuration;
  returnLink: string;
  attributeSet: AttributeSet = {name: '', description: '', attributes: [], type: 'capability'};
  selectedAttributes: Attribute[] = [];
  availableAttributes: Attribute[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private attributeSetService: AttributeSetService,
              private snackBar: MatSnackBar,
              private formBuilder: UntypedFormBuilder,
              private attributeService: AttributeService,
              private configurationService: ConfigurationService) {
  }

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.type = this.route.snapshot.paramMap.get('type');
    this.attributeSet.type = (this.type) ? this.type as 'capability' | 'component' : this.attributeSet.type;
    this.returnLink = (this.attributeSet.type === 'capability') ? '/capabilities' : '/components';
    if (this.id) {
      this.attributeSet = (await this.attributeSetService.get(this.id)) as AttributeSet || this.attributeSet;
    }
    await this.updateAttributes();
    this.form = this.formBuilder.group({
      name: [this.attributeSet.name, Validators.required],
      description: [this.attributeSet.description]
    });
  }

  async updateAttributes() {
    this.selectedAttributes = (await this.attributeService.findBy(this.attributeSet.attributes)) as Attribute[] || [];
    this.configuration = await this.configurationService.get();
    this.availableAttributes = this.configuration.attributes.filter(i => {
      return i.type === this.type && !this.attributeSet.attributes.includes(i.id);
    });
  }

  async save() {
    this.attributeSet = {...this.attributeSet, ...this.form.value};
    if (await this.attributeSetService.add(this.attributeSet)) {
      // update relations
      // await this.patternService.relate(this.relatedPatters, this.capability, 'capabilities');
      this.snackBar.open('Attribute Set was successfully saved');
      await this.router.navigateByUrl(this.returnLink);
    } else {
      this.snackBar.open('There has been an error.');
    }
  }

  async dropAttribute(event: any) {
    moveItemInArray(this.selectedAttributes, event.previousIndex, event.currentIndex);
  }

  async removeAttribute(id: string) {
    await this.deselectAttribute(id);
    await this.attributeService.remove(id);
    await this.updateAttributes();
    this.snackBar.open('Attribute has been removed');
  }

  async selectAttribute(id: string) {
    this.attributeSet.attributes.push(id);
    await this.updateAttributes();
  }

  async deselectAttribute(id: string) {
    const i = this.attributeSet.attributes.indexOf(id);
    if (i > -1) {
      this.attributeSet.attributes.splice(i, 1);
    }
    await this.updateAttributes();
  }
}
