import { Component, ViewChild, OnInit  } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Holding } from '../../shared/models/holding.model';
import {MatTableDataSource, MatPaginator, MatDialog} from '@angular/material';
import { PolicyService } from '../../shared/services/policy.service';
import { PolicyDetail } from '../../shared/models/policyDetail.model';
import { isNullOrUndefined } from 'util';
import { policyDetail } from '../../shared/mockData/mockHolding';
import { AuthenticationService } from '../../shared/services/auth.service';
import { HoldingCache } from '../../shared/models/holding.cache';
import { PolicyCache } from '../../shared/policy.cache';





@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  // declarations
  // pending: string[];
  displayedColumns: string[];
  errorMessage: string;
  disableSubmitBtn: boolean;
  policydetail: PolicyDetail = {} as PolicyDetail;
  policyDetailData: MatTableDataSource<Holding>;
  Total = 0;
  HoldingsCount: number;
  Counter = 0;
  PolicyAgreed: boolean;
  resp: string;
  RequestId: string;
  Broker: string;

  // isPolicyAgreed: boolean;
// constractor
  constructor(private activatedRoute: ActivatedRoute,
              private policyService: PolicyService,
              private router: Router,
              public dialog: MatDialog ) {
    activatedRoute.params.subscribe(val => {
      console.log('acctive route');

      //  this.AuthService.AuthenticateRequest(val.RequestId);
      this.RequestId = val.RequestId;
      this.Broker = val.Broker;
      sessionStorage.setItem('broker', this.Broker);
       console.log(val.RequestId);
    });

    // if (!this.AuthService.isAuthenticated()) {
    //   this.router.navigate(['**']);
    // }

    this.policydetail = <PolicyDetail>PolicyCache.getItem(this.RequestId);  // this.policyService.getPolicyDetails();
    console.log('policy details ', this.policydetail);
    this.PolicyAgreed = this.policydetail.PolicyExist;
    this.policyDetailData = new MatTableDataSource<Holding>(this.policydetail.Holdings);
    this.HoldingsCount = this.policydetail.Holdings.length;

    console.log('constructor');
    this.displayedColumns = ['position', 'share', 'value', 'totalNumShares', 'uninsured', 'pending', 'insured', 'insure', 'cancel', 'costs'];

    // sessionStorage.clear();

    // RequestId = this.activatedRoute.snapshot.params['RequestId'];
    // const TradingPlatform = this.activatedRoute.snapshot.params['Broker'];

    const sessionRequestId: string = sessionStorage.getItem('RequestId');
    if (sessionRequestId === null || sessionRequestId === undefined) {
      sessionStorage.setItem('RequestId', this.RequestId);
    }
  }


  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    console.log('init method');
    this.policyDetailData.paginator = this.paginator;
  }
  applyFilter(filterValue: string) {
    this.policyDetailData.filter = filterValue.trim().toLowerCase();
  }

  // functions
  // submit button function
  async submit() {
    const dialogRef = this.dialog.open(ConfirmSubmitComponent);

    dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.policyService.submit(this.Broker, this.policydetail)
          .subscribe( submitResponse => {
            console.log('submit response ', submitResponse);
            this.policyService.getPendingPolicyDetails(this.Broker, this.RequestId, this.policydetail.Account.AccountNumber)
            .subscribe(penddingPolicyResponse => {
              console.log('pending ', penddingPolicyResponse);
              this.policydetail = penddingPolicyResponse.Data;
              this.policyDetailData = new MatTableDataSource<Holding>(this.policydetail.Holdings);
              this.policyDetailData.paginator = this.paginator;
            },
            errorPendingPolicyDetails => {
              console.log('error  pending  policy details ', errorPendingPolicyDetails);
            });
          },
          errorSubmit => {
            console.log('submit error ', errorSubmit);
          });
        } else { return; }
    });


      //  this.resp = await this.policyService.savePolicyMovements(this.policydetail);

      // if (this.resp === '200') {
      //   // this.router.navigate(['insurance/RequestId/ABCD123/ShareNet']);
      //   PolicyCache.removeItem(this.RequestId);

      //   this.policyService.getPolicyDetails(this.RequestId, this.Broker).
      //   subscribe(policydetail => {
      //     this.policydetail = policydetail.Data;
      //   });
      //    if (!isNullOrUndefined(this.policydetail)) {
      //       PolicyCache.addItem({ RequestId: this.RequestId, DataItem: this.policydetail });
      //    }

      //   this.policyDetailData = new MatTableDataSource<Holding>(this.policydetail.Holdings);
      //  }
      // this.policyDetailData.paginator = this.paginator;
      // console.log('auto renewal ' + this.policydetail.Policy.IsAutoRenewal);
      // console.log('total is: ' + this.Total);
      // this.Total = 0;
  }
  // oln change function
  onChangeValidation(row) {
    this.calculatePremium(row);
  }

  cancelDisable(row): boolean {
    const holding = <Holding>row;
    if (holding.NumberOfSharesToInsure > 0) {
      holding.MovementType = 'BUY';
    }

    if (holding.NumberOfSharesToInsure > 0 || holding.NumberOfSharesToInsure < 0 || holding.InsuredShares <= 0 ) {

      return true;
    }
  }
  insureDisable(row): boolean {
    const holding = <Holding>row;
    if (holding.NumberOfSharesToCancel > 0) {
      holding.MovementType = 'CANCEL';
    }

    if (holding.NumberOfSharesToCancel > 0 || holding.NumberOfSharesToCancel < 0 || holding.UninsuredShares <= 0 ) {
      return true;
    }
  }

   numberToInsureError(row) {
    const holdings = <Holding>row;
    if ( holdings.NumberOfSharesToInsure > holdings.UninsuredShares) {
      this.errorMessage = 'error you can not insure more than your uninsured share';
      console.log(this.errorMessage);
      return true;
    } else if (holdings.NumberOfSharesToInsure  < 0) {
      this.errorMessage = 'error you can not insure less than 0';
      console.log(this.errorMessage);
      return true;
    }
  }

  numberToCancelError(row) {
    const holdings = <Holding>row;
    if ( holdings.NumberOfSharesToCancel > holdings.InsuredShares) {
      this.errorMessage = 'error you can not cancel more than your insured shares';
      console.log(this.errorMessage );
      return false;
      } else if (holdings.NumberOfSharesToCancel < 0) {
      this.errorMessage = 'error you can not cancel less than 0';
      console.log(this.errorMessage );
      return false;
    }
  }

  calculatePremium(row) {
    const holding = <Holding>row;

    if (this.numberToInsureError(row)) {
      holding.Premium = 0;
    } else {
      holding.Premium = holding.StockRate * (holding.StockPrice / 100.00) * holding.NumberOfSharesToInsure;
      this.Total = this.Total + holding.Premium;
    }
  }

  AddHoldingHandler(holdingEmpty: boolean) {
    console.log(holdingEmpty);
    console.log(HoldingCache.NewHolding);
    const newHolding: Holding = HoldingCache.NewHolding;
    newHolding.IsNewHolding = true;

    console.log('Validating Num Of Shares:: ', newHolding.NumberOfShares);
    if (isNullOrUndefined(newHolding.NumberOfShares) || isNaN(newHolding.NumberOfShares)) {
        console.log('Going in here');
        return;
    }

    const index: number = this.findHolding(newHolding);

    if (index > -1) {
      console.log('Holding Exist');
      this.policydetail.Holdings[index].NumberOfShares += +newHolding.NumberOfShares;
      this.policydetail.Holdings[index].UninsuredShares += +newHolding.NumberOfShares;
      this.policydetail.Holdings[index].Value += +newHolding.NumberOfShares * newHolding.StockPrice;
    } else {

      console.log('Holding Does Not Exist');
      newHolding.Premium = 0;
      newHolding.NumberOfSharesToInsure = 0;
      newHolding.NumberOfSharesToCancel = 0;
      newHolding.PendingShares = 0;
      newHolding.InsuredShares = 0;
      newHolding.NumberOfShares = +newHolding.NumberOfShares;
      newHolding.UninsuredShares = +newHolding.UninsuredShares;
      newHolding.HoldingNumber = 0;
      newHolding.Value = newHolding.NumberOfShares * newHolding.StockPrice;
      this.policyDetailData.data.push(newHolding);
      this.policyDetailData = new MatTableDataSource<Holding>(this.policyDetailData.data);
      this.HoldingsCount = this.policydetail.Holdings.length;
    }
    console.log(this.policyDetailData.data);
    this.policyDetailData.paginator = this.paginator;
  }


  findHolding(_holding: Holding) {
    for (let index = 0; index < this.policydetail.Holdings.length; index++) {
      if (this.policydetail.Holdings[index].ISINCode === _holding.ISINCode &&
          this.policydetail.Holdings[index].IsNewHolding === _holding.IsNewHolding) {
        return index;
      }
    }

    return -1;
  }
   policyWordingHandler($event) {
    this.PolicyAgreed = $event;
  }
}

@Component ({
  selector: 'app-confirm-submit',
  templateUrl: './confirmSubmit.component.html'
})

export class ConfirmSubmitComponent {
}

