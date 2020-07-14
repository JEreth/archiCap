import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Pattern} from '../shared/pattern';
import {PatternService} from '../shared/pattern.service';

@Component({
  selector: 'app-pattern-list',
  templateUrl: './pattern-list.component.html',
  styleUrls: ['./pattern-list.component.scss']
})
export class PatternListComponent implements OnInit {

  public patterns: Pattern[];

  constructor(private patternService: PatternService,
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

}
