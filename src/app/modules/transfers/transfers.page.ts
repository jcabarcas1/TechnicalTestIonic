import {Component, OnInit} from '@angular/core';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {FormBuilder, Validators} from '@angular/forms';
import {ProductsService} from '../../services/products.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-transfers',
  templateUrl: 'transfers.page.html',
  styleUrls: ['transfers.page.scss']
})
export class TransfersPage implements OnInit {

  scannedCode = null;
  transferForm: any;
  products: any = [];

  constructor(private barcodeScanner: BarcodeScanner,
              private formBuilder: FormBuilder,
              private productsService: ProductsService,
              private authService: AuthService) {
  }

  ngOnInit(): void {

    this.transferForm = this.formBuilder.group({
      username: [this.authService.getUserLogged().email.split('@')[0]],
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      amount: ['', Validators.required],
      currency: ['', Validators.required]
    });

    // Get products user
    this.productsService.getProductsByUserUid(this.authService.getUserLogged().uid).subscribe(
      (response) => {
        this.products = response;
      }
    );

  }

  scanCode() {

    this.barcodeScanner.scan().then(async barcodeData => {
      this.scannedCode = barcodeData.text;
      await this.productsService.getProductById(JSON.parse(this.scannedCode).idProduct).subscribe(
        response => {
          const destinationProduct = response.data();
          destinationProduct.id = response.id;
          console.log(destinationProduct);
          this.transferForm.get('destination').setValue(destinationProduct.account_number);
          this.transferForm.get('amount').setValue(JSON.parse(this.scannedCode).amount);
          this.transferForm.get('currency').setValue(JSON.parse(this.scannedCode).currency);
        }
      );
    });

  }

  transfer() {

    this.productsService.getProductById(this.transferForm.value.origin).subscribe(
      res => {
        let newBalance = 0;
        if (this.transferForm.value.currency === 'cop') {
          newBalance = res.data().balance_cop - this.transferForm.value.amount;
        } else {
          newBalance = res.data().balance_usd - this.transferForm.value.amount;
        }
        if (newBalance < 0) {
          alert('You do not have enough funds for this transaction.!');
        } else {
          this.productsService.getProductsByAccountNumber(this.transferForm.value.destination).subscribe(
            (response) => {
              console.log('Response ', response);
              if (response.length === 0) {
                alert('Account ' + this.transferForm.value.destination + ' not exist.!');
              } else {
                const destinationId = response[0].id;
                this.productsService
                  .addBalanceProductById(destinationId, this.transferForm.value.amount, this.transferForm.value.currency);
                this.productsService
                  .subBalanceProductById(this.transferForm.value.origin, this.transferForm.value.amount, this.transferForm.value.currency);
                this.clearForm();
                alert('Transfer success!');
              }
            }
          );
        }
      }
    );

  }

  private clearForm() {

    this.transferForm.get('origin').setValue('');
    this.transferForm.get('destination').setValue('');
    this.transferForm.get('amount').setValue('');
    this.scannedCode = null;

  }

}
