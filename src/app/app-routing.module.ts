import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/errors/not-found.component';
import { MasterPageComponent } from './layer/master/masterPage.component';
import { TermsAndConditionsComponent } from './layer/terms_and_conditions/terms_and_conditions.component';
import { AuthGuard } from './shared/services/auth.guard';
import { UnauthorizedComponent } from './shared/unauthorized/unauthorized.component';

const appRoutes: Routes = [
  { path: 'unauthorized', component: UnauthorizedComponent},
  { path: 'insurance/RequestId/:RequestId/:Broker', component: MasterPageComponent}, // , canActivate: [AuthGuard]
  { path: 'account/RequestId/:RequestId/:Broker', component: TermsAndConditionsComponent},
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
