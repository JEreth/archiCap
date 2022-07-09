import { Component, OnInit } from '@angular/core';
import {Case, Circumstance} from '../shared/case';
import {ActivatedRoute, Router} from '@angular/router';
import {CaseService} from '../shared/case.service';

@Component({
  selector: 'app-circumstance-compare',
  templateUrl: './circumstance-compare.component.html',
  styleUrls: ['./circumstance-compare.component.scss']
})
export class CircumstanceCompareComponent implements OnInit {

  public case: Case;
  public ix: number;
  public results: {
    similarity: number;
    circumstance: Circumstance;
    ix: number;
  }[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private caseService: CaseService) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const ix = this.route.snapshot.paramMap.get('index');
    this.case = await (this.caseService.get(id)) as Case;
    if (id && ix && this.case) {
      this.ix = Number(ix);
      // now compare
      for (const [i, circumstance] of this.case.circumstances.entries()) {
        // skip same circumstance and only compare same attribute sets / categories (actions)
        if (i !== this.ix
          && circumstance.category === this.case.circumstances[this.ix].category
          && circumstance.attributeSet === this.case.circumstances[this.ix].attributeSet) {
          this.results.push({
              circumstance,
              similarity: CaseService.compareCircumstances(this.case.circumstances[this.ix], circumstance),
              ix: i
            })
        }
      }
      // now sort results
      this.results.sort((a, b) => b.similarity - a.similarity);
    } else {
      await this.router.navigateByUrl('/cases');
    }
  }

}
