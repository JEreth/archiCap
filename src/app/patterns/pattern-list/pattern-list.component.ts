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
    this.patternService.getAllAsArray().subscribe(patterns => {
      this.patterns = patterns;
    });
  }

  ngOnInit() {
  }

  remove(id: number) {
    this.patternService.remove(id).subscribe(() => {
      this.snackBar.open('Pattern has been removed');
      this.patternService.getAllAsArray().subscribe(patterns => {
        this.patterns = patterns;
      });
    });
  }

}
