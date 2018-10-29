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

import { AppComponent } from './app.component';
import { AccountComponent } from './layer/account_holding/account.component';
import { ClaimComponent } from './layer/insurance_claim/claim.component';

import { DialogComponent } from './shared/dialog/dialog.component';
import { DialogTanplateComponent } from './shared/dialog/dialog.component';
import { ClaimService } from './shared/services/claim.service';
import { NotFoundComponent } from './shared/errors/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { PolicyService } from './shared/services/policy.service';




@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    ClaimComponent,
    DialogComponent,
    DialogTanplateComponent,
    NotFoundComponent

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
    MatPaginatorModule

  ],
  entryComponents: [
    DialogTanplateComponent
  ],
  providers: [ClaimService, PolicyService],
  bootstrap: [AppComponent]
})
export class AppModule { }