import { stocks } from '../mockData/mockHolding';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Stock } from '../models/stock.model';

@Injectable()
export class StockService {
    constructor(private http: HttpClient) {}
    // getStocks() {
    //   return stocks;
    // }

    getStocks(StockExchangeCode: string, TradingPlatformName: string) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': sessionStorage.getItem('req_token')
        })
      };
      return this.http.get<any>('https://dev-admin.investsure.info/dev/stocks/exchange/' + StockExchangeCode + '/platform/' + TradingPlatformName, httpOptions);
    }
}
