
export interface Claim {
 ClaimAmount: number;
 ClaimPerShare: number;
 ClaimTriggered: boolean;
 FraudInTheNews: boolean;
 ISINCode: string;
 OpeningPrice: number;
 StockName: string;
 StockPrice: number;
 TotalClaimableShares: number;
 TotalInsuredShares: number;
 TransactionDate: string;
 TriggeredDate: string;
 TriggerPrice: number;
}
