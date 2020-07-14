import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Pattern} from '../shared/pattern';
import {PatternService} from '../shared/pattern.service';

@Component({
  selector: 'app-pattern-edit',
  templateUrl: './pattern-edit.component.html',
  styleUrls: ['./pattern-edit.component.scss']
})
export class PatternEditComponent implements OnInit {

  public pattern: Pattern = {name: '', description: '', systems: [], capabilities: []};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private patternService: PatternService,
    private snackBar: MatSnackBar
  ) {
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pattern = await this.patternService.get(id) as Pattern;
    }
  }

  async save() {
    if (await this.patternService.add(this.pattern)) {
      this.snackBar.open('Pattern was successfully saved');
      await this.router.navigateByUrl('/patterns');
    } else {
      this.snackBar.open('There has been an error');
    }
  }

}
