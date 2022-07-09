import {Component, OnInit, ViewChild} from '@angular/core';
import {Pattern} from '../shared/pattern';
import {PatternService} from '../shared/pattern.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AttributeSelectionComponent} from '../../eav/attribute-selection/attribute-selection.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-pattern-specify',
  templateUrl: './pattern-specify.component.html',
  styleUrls: ['./pattern-specify.component.scss']
})
export class PatternSpecifyComponent implements OnInit {

  @ViewChild('componentAttributeSelection') componentAttributeSelection: AttributeSelectionComponent;
  @ViewChild('capabilityAttributeSelection') capabilityAttributeSelection: AttributeSelectionComponent;

  public pattern: Pattern;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    public patternService: PatternService) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pattern = await this.patternService.get(id) as Pattern || this.pattern;
    } else {
      await this.router.navigateByUrl('/patterns');
    }
  }

  async save() {
    this.pattern.componentSelection = this.componentAttributeSelection.attributeSelection;
    this.pattern.capabilitySelection = this.capabilityAttributeSelection.attributeSelection;
    if (await this.patternService.add(this.pattern)) {
      this.snackBar.open('Circumstance was successfully saved');
      await this.router.navigateByUrl('/patterns');
    } else {
      this.snackBar.open('There has been an error.');
    }
  }

}
