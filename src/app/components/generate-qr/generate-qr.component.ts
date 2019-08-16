import {Component, OnInit} from '@angular/core';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ProductsService} from '../../services/products.service';

@Component({
  selector: 'app-generate-qr',
  templateUrl: './generate-qr.component.html',
  styleUrls: ['./generate-qr.component.scss'],
})
export class GenerateQrComponent implements OnInit {

  createdCode = null;
  message = null;
  products: any = [];
  qrForm;
  uidLogged;
  constructor(private barcodeScanner: BarcodeScanner,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private productsService: ProductsService) {
  }

  ngOnInit() {
    this.uidLogged = this.authService.getUserLogged().uid ? this.authService.getUserLogged().uid : ''
    // Get products user
    this.productsService.getProductsByUserUid(this.uidLogged).subscribe(
      (response) => {
        this.products = response;
      }
    );

    // Build form
    this.qrForm = this.formBuilder.group({
      idProduct: ['', Validators.required],
      currency: ['', Validators.required],
      amount: ['']
    });

  }

  createCode() {

    this.createdCode = JSON.stringify(this.qrForm.value);

  }

}
