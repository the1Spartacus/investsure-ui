import { holding, policyDetail } from '../mockData/mockHolding';
import { Holding } from '../models/holding.model';
import { PolicyDetail } from '../models/policyDetail.model';
import { Injectable } from '@angular/core';
import { Investor } from '../models/investor.model';
import { Account } from '../models/account.model';
import { Policy } from '../models/policy.model';
import { Observable } from 'rxjs';


@Injectable()
export class PolicyService {

  holding: Holding[] = [{  ISINCode: 2,
    StockActivity: true,
    StockCode: '123',
    StockId: 12,
    StockName: 'SASOL',
    StockPrice: 1000,
    StockRate: 10,
    StockRemainingLimit: 15, HoldingNumber: 1, InsuredShares: 50, NumberOfShares: 500, PendingShares: 100, UninsuredShares: 450, Value: 0,
    NumberOfSharesToInsure: 0, NumberOfSharesToCancel: 0, Premium: 0, MovementType: ''
  },
    {  ISINCode: 3,
      StockActivity: true,
      StockCode: '123',
      StockId: 12,
      StockName: 'CAPITEC',
      StockPrice: 1000,
      StockRate: 10,
      StockRemainingLimit: 15, HoldingNumber: 2, InsuredShares: 501, NumberOfShares: 500, PendingShares: 0, UninsuredShares: 0, Value: 0,
      NumberOfSharesToInsure: 0, NumberOfSharesToCancel: 0, Premium: 0, MovementType: ''
    },
    {  ISINCode: 1,
      StockActivity: true,
      StockCode: '123',
      StockId: 12,
      StockName: 'MTN',
      StockPrice: 1000,
      StockRate: 10,
      StockRemainingLimit: 15, HoldingNumber: 3, InsuredShares: 5001, NumberOfShares: 500, PendingShares: 0, UninsuredShares: 0, Value: 0,
      NumberOfSharesToInsure: 0, NumberOfSharesToCancel: 0, Premium: 0,  MovementType: ''
    },
  ];

  account: Account = {
    AccountBalance: 1230,
    AccountNumber: 12345678,
    TradingPlatformId: 7676767,
    TradingPlatformName: 'easyeqity',
    Holdings: holding
  };

  investor: Investor = {
    Email: 'thulani@spartacus.com',
    FirstName: 'Thulani',
    IdNumber: '9999999999999',
    InvestorId: 12345,
    Name: 'Thulani Spartacus',
    Surname: 'Spartacus',
  };

  policy: Policy = {
    AnniversaryDate: '2010/may 01',
    PolicyNumber: '12344',
    RenewalAmount: 800,
    IsAutoRenewal: true,
  };
  policyDetail: PolicyDetail = {
    account: this.account,
    holdings: this.holding,
    investor: this.investor,
    policy: this.policy,
  };


  constructor() { }

  getHolding(): Holding[] {
    return holding;
  }
  getPolicyDetails(): PolicyDetail {
    console.log('Getting Policy Detail');
    this.policyDetail = policyDetail as PolicyDetail;

    for (let index = 0; index < this.policyDetail.holdings.length; index++) {
      if (this.policyDetail.holdings[index].MovementType === 'BUY') {
        this.policyDetail.holdings[index].PendingShares += this.policyDetail.holdings[index].NumberOfSharesToInsure;
        this.policyDetail.holdings[index].UninsuredShares -= this.policyDetail.holdings[index].NumberOfSharesToInsure;
        this.policyDetail.holdings[index].Premium = 0;
      }

      if (this.policyDetail.holdings[index].MovementType === 'CANCEL') {
        this.policyDetail.holdings[index].InsuredShares -= this.policyDetail.holdings[index].NumberOfSharesToCancel;
        this.policyDetail.holdings[index].UninsuredShares += this.policyDetail.holdings[index].NumberOfSharesToCancel;
      }

      this.policyDetail.holdings[index].NumberOfSharesToCancel = 0;
      this.policyDetail.holdings[index].NumberOfSharesToInsure = 0;
      this.policyDetail.holdings[index].MovementType = '';
      // this.policyDetail.holdings[index].
    }

    return policyDetail;
  }

  async savePolicyMovements( _policyDetail: PolicyDetail): Promise<any> {
    console.log('Save Data');
    console.log(_policyDetail);

    for (let index = 0; index < _policyDetail.holdings.length; index++) {
      console.log('Movement Type: ', _policyDetail.holdings[index].MovementType);
      console.log('Number To Cancel: ', _policyDetail.holdings[index].NumberOfSharesToCancel);
      console.log('Number To Insure: ', _policyDetail.holdings[index].NumberOfSharesToInsure);
      // this.policyDetail.holdings[index].
    }

    //   const obs = new Observable(observer => {
    //   observer.next('200');
    //   observer.complete();
    // });

    const promise = await new Promise((resolve, reject) => {
        resolve({ResponseCode: '200'});
    });

    return '200';
  }
}

