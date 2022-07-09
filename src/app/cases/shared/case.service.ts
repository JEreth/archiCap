import { Injectable } from '@angular/core';
import {EntityService} from '../../shared/entity.service';
import {DataService} from '../../shared/data.service';
import {Circumstance} from './case';

@Injectable({
  providedIn: 'root'
})
export class CaseService extends EntityService {

  public entityCode = 'cases';

  constructor(protected data: DataService) {
    super(data);
  }

  // compares the attribute sets of two circumstances with SMC comparison and return percentage between 0 and 100
  public static compareCircumstances(a: Circumstance, b: Circumstance): number {
    let sameAttributes = [];
    let allAttributes = [];
    //const allAttributes = [...new Set([...a.attributeSelection.map(i => i.attribute), ...b.attributeSelection.map(i => i.attribute)])];
    for (let v of a.attributeSelection) {
      allAttributes.push(v.attribute);
      const match = b.attributeSelection.find(i => i.attribute === v.attribute);
      if (match && v.value === match.value) {
        sameAttributes.push(v.attribute); // match so add to same Attributes
      }
    }
    for (let v of b.attributeSelection) {
      allAttributes.push(v.attribute);
      const match = a.attributeSelection.find(i => i.attribute === v.attribute);
      if (match && v.value === match.value) {
        sameAttributes.push(v.attribute); // match so add to same Attributes
      }
    }
    // clear duplicates
    sameAttributes = [...new Set(sameAttributes)];
    allAttributes = [...new Set(sameAttributes)];
    return (sameAttributes.length / allAttributes.length) * 100;
  }
}
