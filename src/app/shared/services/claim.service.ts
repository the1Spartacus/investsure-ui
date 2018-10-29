import { claim } from '../mockData/mockClient';
import { Claim } from '../models/claim.model';

export class ClaimService {
  constructor() { }

  getClaim(): Claim[] {
    return claim;
  }
}
