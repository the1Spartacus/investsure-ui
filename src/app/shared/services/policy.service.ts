import { Holding } from '../models/holding.model';
import { PolicyDetail } from '../models/policyDetail.model';
import { Stock } from '../models/stock.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceResponse } from '../models/accountReqResponse';
import { policyDetail } from '../mockData/mockHolding';


@Injectable()
export class PolicyService {

  constructor( private http: HttpClient) { }

  // getHolding(): Holding[] {
  //   return holding;
  // }
  getPolicyDetails(RequestId: string, TradingPlatform: string) {
    console.log('Getting Policy Detail');


    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('req_token')
      })
    };

    return this.http.get<ServiceResponse>('https://dev-platform.investsure.info/dev/policy/platform/' + TradingPlatform + '/request/' + RequestId, httpOptions );

  }

  getPendingPolicyDetails(TradingPlatform: string, RequestId: string, AccountNumber: string) {
    console.log('Getting Pending Policy Detail');

    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('req_token')
      })
    };
    return this.http.get<ServiceResponse>('https://dev-platform.investsure.info/dev/policy/platform/' + TradingPlatform + '/request/' + RequestId + '/account/' + AccountNumber + '/pending', httpOptions);
  }

  DoesPolicyExist(_policyDetail: PolicyDetail): boolean {
    if (_policyDetail.PolicyExist === true) {
      return true;
    }
  }


  async savePolicyMovements( _policyDetail: PolicyDetail): Promise<any> {
    console.log('Save Data');
    console.log(JSON.stringify(_policyDetail));

    for (let index = 0; index < _policyDetail.Holdings.length; index++) {
      console.log('Movement Type: ', _policyDetail.Holdings[index].MovementType);
      console.log('Number To Cancel: ', _policyDetail.Holdings[index].NumberOfSharesToCancel);
      console.log('Number To Insure: ', _policyDetail.Holdings[index].NumberOfSharesToInsure);
    }

    const promise = await new Promise((resolve, reject) => {
        resolve({ResponseCode: '200'});
    });

    return '200';
  }

  submit(TradingPlatform: string, _policyDetail: PolicyDetail) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('req_token')
      })
    };
    return this.http.post<ServiceResponse>('https://dev-platform.investsure.info/dev/insurance/' + TradingPlatform + '/process', _policyDetail, httpOptions);
  }

}

