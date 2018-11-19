import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountComponent } from './account.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DialogComponent, DialogTanplateComponent } from '../../shared/dialog/policy-dialog/dialog.component';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddDialogComponent, AddDialogTanplateComponent } from '../../shared/dialog/add-dialog/add-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from '../../app-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppComponent } from '../../app.component';
import { ClaimComponent } from '../insurance_claim/claim.component';
import { NotFoundComponent } from '../../shared/errors/not-found.component';
import { MasterPageComponent } from '../master/masterPage.component';
import { TermsAndConditionsComponent } from '../terms_and_conditions/terms_and_conditions.component';
import { APP_BASE_HREF } from '@angular/common';
import {ClaimService} from '../../shared/services/claim.service';
import { PolicyService } from '../../shared/services/policy.service';
import { StockService } from '../../shared/services/stock.service';
import { policyDetail } from '../../shared/mockData/mockHolding';


describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountComponent,
                      DialogComponent,
                      AddDialogComponent,
                      AppComponent,
                      AccountComponent,
                      ClaimComponent,
                      DialogComponent,
                      DialogTanplateComponent,
                      NotFoundComponent,
                      AddDialogTanplateComponent,
                      AddDialogComponent,
                      MasterPageComponent,
                      TermsAndConditionsComponent ],
      imports: [MatListModule,
                MatSlideToggleModule,
                FormsModule,
                MatTableModule,
                MatPaginatorModule,
                MatFormFieldModule,
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
                MatToolbarModule ],
                providers: [ClaimService, PolicyService, StockService, {provide: APP_BASE_HREF, useValue: '/insurance/RequestId/:RequestId/:Broker'}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(AccountComponent).toBeTruthy();
  });

  it('should get policy details.invester', () => {
    expect(component.policydetail.Investor).not.toBeNull();
  });

  it('should get policy details.Acccount', () => {
    expect(component.policydetail.Account).not.toBeNull();
  });

  it('should get policy details.Holdings', () => {
    expect(component.policydetail.Holdings.length).toBeGreaterThan(0);
  });

  it('sholuld check if the policy is agreed or not', () => {
    expect(component.PolicyAgreed).toBeTruthy();
  });

  it('sholuld check if the displayed Columns are valid', () => {
    expect(component.displayedColumns).toEqual(['position', 'share', 'value', 'totalNumShares', 'uninsured', 'pending', 'insured', 'insure', 'cancel', 'costs']);
  });

  it('sholuld disable the number to  insure fields', () => {
    expect(component.insureDisable).toBeTruthy();
  });

  it('sholuld disable the number to cancel fields', () => {
    expect(component.cancelDisable).toBeTruthy();
  });
  it('sholuld check if numberToCancelError() will return true or false', () => {
    expect(component.numberToCancelError).toBeTruthy();
  });
  it('sholuld check if numberToInsureError() will return true or false', () => {
    expect(component.numberToInsureError).toBeTruthy();
  });

  it('sholuld check if calculatePremium() will return true or false', () => {
    expect(component.calculatePremium).toBeTruthy();
  });

  it('sholuld check if AddHoldingHandler() add new policy details', () => {
    expect(component.AddHoldingHandler).toBeTruthy();
  });

  it('sholuld check if findHolding() exist or is new', () => {
    expect(component.findHolding).toBeTruthy();
  });
});
