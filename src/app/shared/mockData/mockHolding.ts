import { Stock } from '../models/stock.model';
import { Holding } from '../models/holding.model';
import { Investor } from '../models/investor.model';
import { Policy } from '../models/policy.model';
import { PolicyDetail } from '../models/policyDetail.model';
import { Account } from '../models/account.model';

export let holding: Holding[] = [{  ISINCode: 2,
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

export let account: Account = {
  AccountBalance: 1230,
  AccountNumber: 12345678,
  TradingPlatformId: 7676767,
  TradingPlatformName: 'easyeqity',
  Holdings: holding
};

export let investor: Investor = {
  Email: 'thulani@spartacus.com',
  FirstName: 'Thulani',
  IdNumber: '9999999999999',
  InvestorId: 12345,
  Name: 'Thulani Spartacus',
  Surname: 'Spartacus',
};

export let policy: Policy = {
  AnniversaryDate: '2010/may 01',
  PolicyNumber: '12344',
  RenewalAmount: 800,
  IsAutoRenewal: false,
};
export let policyDetail: PolicyDetail = {
  account: account,
  holdings: holding,
  investor: investor,
  policy: policy,
};
