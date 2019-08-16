import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {TransfersPage} from './transfers.page';
import {AuthService} from '../../services/auth.service';
import {ProductsService} from '../../services/products.service';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {TabsPageRoutingModule} from '../tabs/tabs.router.module';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AppRoutingModule} from '../../app-routing.module';
import {TabsPage} from '../tabs/tabs.page';
import {LoginComponent} from '../../components/login/login.component';
import {GenerateQrComponent} from '../../components/generate-qr/generate-qr.component';

describe('TransfersPage', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        TabsPageRoutingModule,
        NgxQRCodeModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AppRoutingModule,
        AngularFireAuthModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        BarcodeScanner
      ],
      declarations: [
        TabsPage,
        LoginComponent,
        GenerateQrComponent
      ]
    }).compileComponents();

  }));

  it('initialize page', () => {

    const component = new TransfersPage(
      TestBed.get(BarcodeScanner),
      TestBed.get(FormBuilder),
      TestBed.get(ProductsService),
      TestBed.get(AuthService)
    );
    expect(component).toBeDefined();

  });

});
