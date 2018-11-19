import { Holding } from './holding.model';
import { Investor } from './investor.model';
import { Policy } from './policy.model';
import { Account } from './account.model';

export interface PolicyDetail {
  Account: Account;
  Holdings: Holding[];
  Investor: Investor;
  Policy: Policy;
  PolicyExist: boolean;
}
