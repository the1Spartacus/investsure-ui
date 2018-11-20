import { stocks } from '../mockData/mockHolding';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Stock } from '../models/stock.model';
import { ServiceResponse } from '../models/accountReqResponse';

@Injectable()
export class StockService {
    constructor(private http: HttpClient) {}
    // getStocks() {
    //   return stocks;
    // }

    getStocks(StockExchange: string, TradingPlatform: string) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': sessionStorage.getItem('req_token')
        })
      };

      return this.http.get<ServiceResponse>('https://dev-admin.investsure.info/dev/stocks/market/' + StockExchange + '/platform/' + TradingPlatform, httpOptions);
      // return this.http.get<any>('https://dev-admin.investsure.info/dev/stocks/exchange/' + StockExchangeCode + '/platform/' + TradingPlatformName, httpOptions);
    }
}
