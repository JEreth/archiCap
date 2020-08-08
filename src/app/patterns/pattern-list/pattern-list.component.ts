import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Pattern} from '../shared/pattern';
import {PatternService} from '../shared/pattern.service';
import {PatternInfoComponent} from '../pattern-info/pattern-info.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-pattern-list',
  templateUrl: './pattern-list.component.html',
  styleUrls: ['./pattern-list.component.scss']
})
export class PatternListComponent implements OnInit {

  public patterns: Pattern[];

  constructor(private patternService: PatternService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  async ngOnInit() {
    await this.update();
  }

  async update() {
    this.patterns = await this.patternService.all() as Pattern[];
  }

  async remove(id: string) {
    if (await this.patternService.remove(id)) {
      await this.update();
      this.snackBar.open('Pattern has been removed');
    } else {
      this.snackBar.open('There has been an error');
    }
  }

  showPatternInfo(event, pattern: Pattern) {
    event.stopPropagation();
    this.dialog.open(PatternInfoComponent, {
      data: {pattern},
    });
  }

}
