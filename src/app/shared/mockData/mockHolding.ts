import { Stock } from '../models/stock.model';
import { Holding } from '../models/holding.model';
import { Investor } from '../models/investor.model';
import { Policy } from '../models/policy.model';
import { PolicyDetail } from '../models/policyDetail.model';
import { Account } from '../models/account.model';

export let stocks: Stock[] = [{
  ISINCode: 4,
  StockActivity: true,
  StockCode: '1234',
  StockId: 4432,
  StockName: 'BIG BANANA FILMS',
  StockPrice: 34.00,
  StockRate: 0.0056,
  StockRemainingLimit: 50
},
{
  ISINCode: 5,
  StockActivity: true,
  StockCode: '1234',
  StockId: 4432,
  StockName: 'LAFARGE',
  StockPrice: 98.34,
  StockRate: 0.0056,
  StockRemainingLimit: 50
},
{
  ISINCode: 6,
  StockActivity: true,
  StockCode: '1234',
  StockId: 4432,
  StockName: 'MEDA PHARMA',
  StockPrice: 45.60,
  StockRate: 0.0056,
  StockRemainingLimit: 50
},
{
  ISINCode: 7,
  StockActivity: true,
  StockCode: '1234',
  StockId: 4432,
  StockName: 'NETFLIX',
  StockPrice: 500,
  StockRate: 0.0056,
  StockRemainingLimit: 50
},
{
  ISINCode: 1,
  StockActivity: true,
  StockCode: '123',
  StockId: 12,
  StockName: 'SASOL',
  StockPrice: 564.87,
  StockRate: 0.0056,
  StockRemainingLimit: 15
},
{
  ISINCode: 2,
  StockActivity: true,
  StockCode: '123',
  StockId: 12,
  StockName: 'CAPITEC',
  StockPrice: 945.87,
  StockRate: 0.0056,
  StockRemainingLimit: 15
},
{
  ISINCode: 3,
  StockActivity: true,
  StockCode: '123',
  StockId: 12,
  StockName: 'MTN',
  StockPrice: 87.66,
  StockRate: 0.0056,
  StockRemainingLimit: 15
}];

export let holding: Holding[] = [{  ISINCode: 1,
  StockActivity: true,
  StockCode: '123',
  StockId: 12,
  StockName: 'SASOL',
  StockPrice: 564.87,
  StockRate: 10,
  StockRemainingLimit: 15, HoldingNumber: 1, InsuredShares: 50, NumberOfShares: 500, PendingShares: 100, UninsuredShares: 450, Value: 0,
  NumberOfSharesToInsure: 0, NumberOfSharesToCancel: 0, Premium: 0, MovementType: '', IsNewHolding: false
},
  {  ISINCode: 2,
    StockActivity: true,
    StockCode: '123',
    StockId: 12,
    StockName: 'CAPITEC',
    StockPrice: 945.87,
    StockRate: 0.0056,
    StockRemainingLimit: 15, HoldingNumber: 2, InsuredShares: 501, NumberOfShares: 500, PendingShares: 0, UninsuredShares: 0, Value: 0,
    NumberOfSharesToInsure: 0, NumberOfSharesToCancel: 0, Premium: 0, MovementType: '', IsNewHolding: false
  },
  {  ISINCode: 3,
    StockActivity: true,
    StockCode: '123',
    StockId: 12,
    StockName: 'MTN',
    StockPrice: 87.66,
    StockRate: 0.0056,
    StockRemainingLimit: 15, HoldingNumber: 3, InsuredShares: 5001, NumberOfShares: 500, PendingShares: 0, UninsuredShares: 0, Value: 0,
    NumberOfSharesToInsure: 0, NumberOfSharesToCancel: 0, Premium: 0,  MovementType: '', IsNewHolding: false
  },
];

export let account: Account = {
  AccountBalance: 1230,
  AccountNumber: 12345678,
  TradingPlatformId: 7676767,
  TradingPlatformName: 'easyeqity'
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
  AnniversaryDate: '2010-May-01',
  PolicyNumber: '12344',
  RenewalAmount: 800,
  IsAutoRenewal: true,
};
export let policyDetail: PolicyDetail = {
  Account: account,
  Holdings: holding,
  Investor: investor,
  Policy: policy,
  PolicyExist: false
};
