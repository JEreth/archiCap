import {Component, Input, OnInit} from '@angular/core';
import {AttributeSet} from '../shared/models';
import {AttributeSetService} from '../shared/attribute-set.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-attributeset-list',
  templateUrl: './attributeset-list.component.html',
  styleUrls: ['./attributeset-list.component.scss']
})
export class AttributesetListComponent implements OnInit {

  @Input() type = 'all';

  attributeSets: AttributeSet[];

  constructor(private attributeSetService: AttributeSetService,
              private snackBar: MatSnackBar) {
  }

  async ngOnInit() {
    await this.update();
  }


  async update() {
    this.attributeSets = (this.type !== 'all') ?
      (await this.attributeSetService.findBy(this.type, 'type') as AttributeSet[]) :
      (await this.attributeSetService.all() as AttributeSet[]);
  }

  async remove(id: string) {
    await this.attributeSetService.remove(id);
    await this.update();
    this.snackBar.open('Attribute set has been removed');
  }

}
