import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {MatDialog} from '@angular/material';
import { HoldingCache } from '../../models/holding.cache';
import { StockService } from '../../services/stock.service';
import { Stock } from '../../models/stock.model';
import { Holding } from '../../models/holding.model';
import { isNullOrUndefined } from 'util';


/**
 * @title Dialog with header, scrollable content and actions
 */
@Component({
  selector: 'app-add-dialog',
  templateUrl: 'add-dialog.component.html',
  styleUrls: ['./add-dailog.component.css']
})
export class AddDialogComponent {

  @Output() holdingAdded: EventEmitter <boolean> = new EventEmitter<boolean>();

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(AddDialogTanplateComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.holdingAdded.emit(isNullOrUndefined(HoldingCache.NewHolding));
    });
  }
}

@Component({
  selector: 'app-add-dialog-tamplate',
  templateUrl: 'add-dialogTamplate.component.html',
  styleUrls: ['./add-dialogTamplate.component.css']
})
export class AddDialogTanplateComponent implements OnInit {
    selectedStock: Stock;
    numberOfShares: 0;
    Stocks: Stock[];

    constructor(private stockService: StockService) {
        this.Stocks = stockService.getStocks();
    }

    ngOnInit(): void {
      HoldingCache.NewHolding = {} as Holding;
    }

    addHolding() {
      // console.log(this.numberOfShares);
      // console.log(this.selectedStock);

      // HoldingCache.NewHolding = this.selectedStock;
      if (!isNullOrUndefined(this.numberOfShares)) {
          Object.assign(HoldingCache.NewHolding, this.selectedStock);
          HoldingCache.NewHolding.NumberOfShares = this.numberOfShares;
          HoldingCache.NewHolding.UninsuredShares = this.numberOfShares;

          const h: Holding = {} as Holding;
          Object.assign(h, HoldingCache.NewHolding);
      }
      // console.log(h);
    }

    removeHolding() {
      // console.log(this.numberOfShares);
      // console.log(this.selectedStock);
    }
}
