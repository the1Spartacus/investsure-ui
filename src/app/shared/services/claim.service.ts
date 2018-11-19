import { claim } from '../mockData/mockClient';
import { Claim } from '../models/claim.model';
import { Injectable } from '@angular/core';

@Injectable()
export class ClaimService {
  constructor() { }

  getClaim(): Claim[] {
    return claim;
  }
}
