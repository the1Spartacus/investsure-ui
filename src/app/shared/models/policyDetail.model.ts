import { Holding } from './holding.model';
import { Investor } from './investor.model';
import { Policy } from './policy.model';
import { Account } from './account.model';

export interface PolicyDetail {
  account: Account;
  holdings: Holding[];
  investor: Investor;
  policy: Policy;
}
