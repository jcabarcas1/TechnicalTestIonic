import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TransfersPage} from './transfers.page';

import {NgxQRCodeModule} from 'ngx-qrcode2';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    NgxQRCodeModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{path: '', component: TransfersPage}]),
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    TransfersPage
  ],
  providers: [
    BarcodeScanner
  ]
})
export class TransfersModule {
}
