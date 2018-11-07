import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AccountComponent } from './layer/account_holding/account.component';
import { DialogComponent, DialogTanplateComponent } from './shared/dialog/policy-dialog/dialog.component';
import { AddDialogComponent, AddDialogTanplateComponent } from './shared/dialog/add-dialog/add-dialog.component';
import { ClaimComponent } from './layer/insurance_claim/claim.component';
import { NotFoundComponent } from './shared/errors/not-found.component';
import { MasterPageComponent } from './layer/master/masterPage.component';
import { TermsAndConditionsComponent } from './layer/terms_and_conditions/terms_and_conditions.component';
import { MatListModule, MatSlideToggleModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatGridListModule, MatCardModule, MatDividerModule, MatButtonModule, MatInputModule, MatDialogModule, MatSelectModule, MatToolbarModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ClaimService } from './shared/services/claim.service';
import { PolicyService } from './shared/services/policy.service';
import { StockService } from './shared/services/stock.service';
import { APP_BASE_HREF } from '@angular/common';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent,
        AccountComponent,
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
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create the app', () => {

    expect(AppComponent).toBeTruthy();
  });

  it(`should have as title 'InvestSure'`, () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('InvestSure');
  });


});

