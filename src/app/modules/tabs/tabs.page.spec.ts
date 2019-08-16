import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsPage } from './tabs.page';
import {ProfilePage} from '../profile/profile.page';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {WeatherService} from '../../services/weather.service';
import {AuthService} from '../../services/auth.service';
import {ProductsService} from '../../services/products.service';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TabsPageRoutingModule} from './tabs.router.module';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {Router, RouterModule} from '@angular/router';
import {AppRoutingModule} from '../../app-routing.module';
import {LoginComponent} from '../../components/login/login.component';
import {GenerateQrComponent} from '../../components/generate-qr/generate-qr.component';
import {NgxQRCodeModule} from 'ngx-qrcode2';


describe('TabsPage', () => {

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
      declarations: [
        TabsPage,
        LoginComponent,
        GenerateQrComponent
      ]
    }).compileComponents();
  }));

  it('should initialize tabs', () => {
    const component = new TabsPage(
      TestBed.get(AuthService),
      TestBed.get(Router)
    );
    expect(component).toBeDefined();
  });
});
