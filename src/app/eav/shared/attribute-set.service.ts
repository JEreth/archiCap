import {Injectable} from '@angular/core';
import {EntityService} from '../../shared/entity.service';
import {DataService} from '../../shared/data.service';
import {AttributeSelection} from './models';

@Injectable({
  providedIn: 'root'
})
export class AttributeSetService extends EntityService {

  public entityCode = 'attributeSets';

  constructor(protected data: DataService) {
    super(data);
  }

  // compares the attribute sets of two attribute sets with SMC comparison and return percentage between 0 and 100
  public static CompareAttributeSelection(a: AttributeSelection[], b: AttributeSelection[]): number {
    let sameAttributes = [];
    let allAttributes = [];
    for (let v of a) {
      allAttributes.push(v.attribute);
      const match = b.find(i => i.attribute === v.attribute);
      if (match && v.value === match.value) {
        sameAttributes.push(v.attribute); // match so add to same Attributes
      }
    }
    for (let v of b) {
      allAttributes.push(v.attribute);
      const match = a.find(i => i.attribute === v.attribute);
      if (match && v.value === match.value) {
        sameAttributes.push(v.attribute); // match so add to same Attributes
      }
    }
    // clear duplicates
    sameAttributes = [...new Set(sameAttributes)];
    allAttributes = [...new Set(allAttributes)];
    return Math.round((sameAttributes.length / allAttributes.length) * 100);
  }
}
