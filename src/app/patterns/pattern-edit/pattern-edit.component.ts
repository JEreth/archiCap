import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {Pattern} from '../shared/pattern';
import {PatternService} from '../shared/pattern.service';
import {SystemService} from '../../systems/shared/system.service';
import {System} from '../../systems/shared/system';

@Component({
  selector: 'app-pattern-edit',
  templateUrl: './pattern-edit.component.html',
  styleUrls: ['./pattern-edit.component.scss']
})
export class PatternEditComponent implements OnInit {

  public pattern: Pattern;
  public systems: System[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private patternService: PatternService,
    private snackBar: MatSnackBar,
    private systemService: SystemService
  ) {

    // get the id from the path and load pattern if set
    const id = this.route.snapshot.paramMap.get('id');
    const patternId: number = Number(id);
    if (id === 'new') {
      this.pattern = <Pattern>{name: '', description: ''};
    } else {
      this.patternService.get(patternId).subscribe( c => {
        if (c) {
          this.pattern = <Pattern> c;
          this.systemService.findFromRelation('patterns', patternId).subscribe(systems => {
            this.systems = systems;
          });
        } else {
          this.pattern = <Pattern>{name: '', description: ''};
        }
      });
    }

  }

  ngOnInit() {
  }

  save() {
    this.patternService.add(this.pattern).subscribe( () => {
      this.snackBar.open('Pattern was successfully saved');
      this.router.navigateByUrl('/patterns');
    });
  }

}
