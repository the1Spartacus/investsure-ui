import { Injectable } from '@angular/core';

@Injectable()
export class  PolicyWordingService  {
  getPolicyWording(brockerName: string) {
    return '/src/assets/policy_wording/' + brockerName + '.pdf';
  }
}
