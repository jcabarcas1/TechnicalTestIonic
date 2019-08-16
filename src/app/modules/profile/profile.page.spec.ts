import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfilePage } from './profile.page';
import {FormBuilder, FormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ProductsService} from '../../services/products.service';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {WeatherService} from '../../services/weather.service';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {HTTP} from '@ionic-native/http/ngx';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from '@angular/fire/auth';

describe('ProfilePage', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: ProfilePage}]),
        SharedModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireAuthModule
      ],
      declarations: [
        ProfilePage
      ],
      providers: [
        Geolocation,
        HTTP
      ]
    }).compileComponents();

  }));

  it('should create new instance', () => {

    const component = new ProfilePage(
      TestBed.get(Geolocation),
      TestBed.get(WeatherService),
      TestBed.get(AuthService),
      TestBed.get(ProductsService)
    );
    expect(component).toBeDefined();

  });

});
