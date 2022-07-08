import { Component, OnInit } from '@angular/core';
import {CaseService} from '../shared/case.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Case} from '../shared/case';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.scss']
})
export class CaseListComponent implements OnInit {

  public cases: Case[];

  constructor(private caseService: CaseService,
              private snackBar: MatSnackBar) { }

  async ngOnInit() {
    await this.update();
  }

  async update() {
    this.cases = (await this.caseService.all()) as Case[];
  }

  async remove(id: string) {
    if (await this.caseService.remove(id)) {
      await this.update();
      this.snackBar.open('Case has been removed');
    } else {
      this.snackBar.open('There has been an error');
    }
  }

  async drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.cases, event.previousIndex, event.currentIndex);
    await this.caseService.persist(this.cases);
  }

}
