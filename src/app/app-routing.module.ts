import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './layer/account_holding/account.component';
import { NotFoundComponent } from './shared/errors/not-found.component';


const appRoutes: Routes = [
  { path: 'insurance/RequestId/:RequestId/:Broker', component: AccountComponent },
  // { path: '', component: AccountComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
