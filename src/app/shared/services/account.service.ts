import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceResponse } from '../models/accountReqResponse';

@Injectable()
export class AccountService {
  constructor(private http: HttpClient) {}

  // Verify Account Request (Authenticate Request)
  AuthenticateRequest(RequestId: string, TradingPlatform: string) {
  return  this.http.get<ServiceResponse>('https://dev-platform.investsure.info/dev/account/request/' + RequestId + '/platform/' + TradingPlatform + '/verify');
  }

}
