import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { AccountComponent, ConfirmSubmitComponent} from './layer/account_holding/account.component';
import { ClaimComponent } from './layer/insurance_claim/claim.component';

import { DialogComponent } from './shared/dialog/policy-dialog/dialog.component';
import { DialogTanplateComponent } from './shared/dialog/policy-dialog/dialog.component';
import { ClaimService } from './shared/services/claim.service';
import { NotFoundComponent } from './shared/errors/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { PolicyService } from './shared/services/policy.service';
import { AddDialogTanplateComponent, AddDialogComponent } from './shared/dialog/add-dialog/add-dialog.component';
import { StockService } from './shared/services/stock.service';
import { MasterPageComponent } from './layer/master/masterPage.component';
import { TermsAndConditionsComponent } from './layer/terms_and_conditions/terms_and_conditions.component';
import { AuthenticationService } from './shared/services/auth.service';
import { AuthGuard } from './shared/services/auth.guard';
import { AccountService } from './shared/services/account.service';
import { UnauthorizedComponent } from './shared/unauthorized/unauthorized.component';
import { PolicyWordingService } from './shared/services/policyWording.service';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    ClaimComponent,
    DialogComponent,
    DialogTanplateComponent,
    NotFoundComponent,
    AddDialogTanplateComponent,
    AddDialogComponent,
    MasterPageComponent,
    TermsAndConditionsComponent,
    UnauthorizedComponent,
    ConfirmSubmitComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatGridListModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatListModule,
    MatSlideToggleModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule,
    AppRoutingModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatToolbarModule,
    HttpModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    PdfViewerModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  exports: [
    MatFormFieldModule
  ],
  entryComponents: [
    DialogTanplateComponent,
    AddDialogTanplateComponent,
    ConfirmSubmitComponent
  ],
  providers: [ClaimService,
              PolicyService,
              StockService,
              AuthenticationService ,
              AuthGuard,
              AccountService,
              PolicyWordingService
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
