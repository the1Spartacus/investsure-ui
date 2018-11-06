import { holding, policyDetail, policy } from '../mockData/mockHolding';
import { Holding } from '../models/holding.model';
import { PolicyDetail } from '../models/policyDetail.model';
import { Stock } from '../models/stock.model';

export class PolicyService {

  constructor() { }

  getHolding(): Holding[] {
    return holding;
  }
  getPolicyDetails(): PolicyDetail {
    console.log('Getting Policy Detail');

    for (let index = 0; index < policyDetail.holdings.length; index++) {
        if (policyDetail.holdings[index].MovementType === 'BUY') {
            policyDetail.holdings[index].PendingShares += policyDetail.holdings[index].NumberOfSharesToInsure;
            policyDetail.holdings[index].UninsuredShares -= policyDetail.holdings[index].NumberOfSharesToInsure;
            policyDetail.holdings[index].Premium = 0;
        }

        if (policyDetail.holdings[index].MovementType === 'CANCEL') {
            policyDetail.holdings[index].InsuredShares -= policyDetail.holdings[index].NumberOfSharesToCancel;
            policyDetail.holdings[index].UninsuredShares += policyDetail.holdings[index].NumberOfSharesToCancel;
        }

        policyDetail.holdings[index].NumberOfSharesToCancel = 0;
        policyDetail.holdings[index].NumberOfSharesToInsure = 0;
        policyDetail.holdings[index].MovementType = '';
        policyDetail.holdings[index].Value = policyDetail.holdings[index].StockPrice * policyDetail.holdings[index].NumberOfShares;

      // this.policyDetail.holdings[index].
    }

    policyDetail.PolicyExist = true;

    return policyDetail;
  }

  // DoesPolicyExist(): boolean {
  //  if (this.getPolicyDetails().PolicyExist === true) {
  //    return true;
  //  } else { return false; }
  // }


  async savePolicyMovements( _policyDetail: PolicyDetail): Promise<any> {
    console.log('Save Data');
    console.log(_policyDetail);

    for (let index = 0; index < _policyDetail.holdings.length; index++) {
      console.log('Movement Type: ', _policyDetail.holdings[index].MovementType);
      console.log('Number To Cancel: ', _policyDetail.holdings[index].NumberOfSharesToCancel);
      console.log('Number To Insure: ', _policyDetail.holdings[index].NumberOfSharesToInsure);
    }

    const promise = await new Promise((resolve, reject) => {
        resolve({ResponseCode: '200'});
    });

    return '200';
  }

}

