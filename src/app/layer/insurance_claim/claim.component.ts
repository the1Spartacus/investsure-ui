import { Component, ViewChild, OnInit } from '@angular/core';
import { ClaimService } from '../../shared/services/claim.service';
import {MatTableDataSource, MatPaginator} from '@angular/material';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})

export class ClaimComponent  implements OnInit {
  displayedColumns: string[] = ['ISINCode', 'StockName', 'FraudInTheNews', 'ClaimTriggered', 'TriggeredDate', 'TotalClaimableShares', 'TriggerPrice', 'StockPrice', 'ClaimPerShare', 'ClaimAmount', 'TransactionDate', 'TotalInsuredShares', 'OpeningPrice',
     ];
   constructor(private claimService: ClaimService ) { }
   dataSource = new MatTableDataSource(this.claimService.getClaim());

   @ViewChild(MatPaginator) paginator: MatPaginator;

   ngOnInit() {
     this.dataSource.paginator = this.paginator;
   }
   applyFilter(filterValue: string) {
     this.dataSource.filter = filterValue.trim().toLowerCase();
   }
}
