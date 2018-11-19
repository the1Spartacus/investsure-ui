export interface AccountReqResponse {
  Code: number;
  Data: { IsValidRequest: boolean, RequestToken: string };
  Id: string;
  Message: string;
}
