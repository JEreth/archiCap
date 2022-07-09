import { Component, OnInit } from '@angular/core';
import {Case, CaseSystem} from '../shared/case';
import {ActivatedRoute, Router} from '@angular/router';
import {CaseService} from '../shared/case.service';

@Component({
  selector: 'app-system-compare',
  templateUrl: './system-compare.component.html',
  styleUrls: ['./system-compare.component.scss']
})
export class SystemCompareComponent implements OnInit {

  public case: Case;
  public ix: number;
  public results: {
    similarity: number;
    system: CaseSystem;
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

      const cases: Case[] = await this.caseService.all() as Case[];
      let allRelevantSystems: CaseSystem[] = [];
      for (const c of cases) {
        for (const [i, s] of c.systems.entries()) {
          if (s.attributeSet === this.case.systems[this.ix].attributeSet &&
            (c.id !== this.case.id || i !== this.ix)) {
            allRelevantSystems.push(s);
          }
        }
      }

      // now compare all systems in all cases
      for (const system of allRelevantSystems) {
        this.results.push({
          system,
          similarity: CaseService.compareSystems(this.case.systems[this.ix], system)
        });
      }
      // now sort results
      this.results.sort((a, b) => b.similarity - a.similarity);
    } else {
      await this.router.navigateByUrl('/cases');
    }
  }

}
