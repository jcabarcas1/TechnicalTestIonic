import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import { GenerateQrComponent } from './generate-qr.component';
import {LoginComponent} from '../login/login.component';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from '../../app-routing.module';
import {environment} from '../../../environments/environment';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';

import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from '@angular/fire/auth';
import any = jasmine.any;
import {ProductsService} from '../../services/products.service';

describe('GenerateQrComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, GenerateQrComponent],
      imports: [
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireAuthModule
      ],
      providers: [
        BarcodeScanner
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  it('should create', () => {
    const component = new GenerateQrComponent(
      TestBed.get(BarcodeScanner),
      TestBed.get(FormBuilder),
      TestBed.get(AuthService),
      TestBed.get(ProductsService)
    );
    expect(component).toBeDefined();
  });

  it('create qr code', () => {
    const component = new GenerateQrComponent(
      TestBed.get(BarcodeScanner),
      TestBed.get(FormBuilder),
      TestBed.get(AuthService),
      TestBed.get(ProductsService)
    );
    component.qrForm = {
      value: {
        dummy: 'dummyvalue'
      }
    };
    component.createCode();
    expect(component.createdCode).toBeDefined();
  });

  it('create qr code failed (without qrForm)', () => {
    const component = new GenerateQrComponent(
      TestBed.get(BarcodeScanner),
      TestBed.get(FormBuilder),
      TestBed.get(AuthService),
      TestBed.get(ProductsService)
    );
    expect(component.createCode).toThrow();
  });

});
