import { Stock } from './stock.model';

export interface Holding extends Stock {
  HoldingNumber: number;
  InsuredShares: number;
  NumberOfShares: number;
  PendingShares: number;
  UninsuredShares: number;
  Value: number;
  NumberOfSharesToInsure: number;
  NumberOfSharesToCancel: number;
  Premium: number;
  MovementType: string;
  }
