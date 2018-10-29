import { holding, policyDetail } from '../mockData/mockHolding';
import { Holding } from '../models/holding.model';
import { PolicyDetail } from '../models/policyDetail.model';
import { Injectable } from '@angular/core';

@Injectable()
export class PolicyService {
  constructor() { }

  getHolding(): Holding[] {
    return holding;
  }
  getPolicyDetails(): PolicyDetail {
    return policyDetail;
  }

  savePolicyMovements( policyDetails: PolicyDetail) {
    console.log(policyDetails);
    for (let index = 0; index < policyDetails.holdings.length; index++) {
      policyDetail.holdings[index].MovementType = '';
      policyDetail.holdings[index].NumberOfSharesToCancel = 0;
      policyDetail.holdings[index].NumberOfSharesToInsure = 0;
      policyDetail.holdings[index].Premium = 0;
    }
  }
}
