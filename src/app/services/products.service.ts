import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {AngularFirestore} from 'angularfire2/firestore';
import {map} from 'rxjs/operators';
import {ProductI} from '../models/products/product-i';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private authService: AuthService,
              private db: AngularFirestore) {
  }

  getProductsByUserUidAndType(uidCurrentUser, type) {

    return this.db.collection('products', ref => ref.where('owner', '==', uidCurrentUser)
      .where('type', '==', type))
      .snapshotChanges()
      .pipe(map(products => {
        return products.map(
          (data) => {
            const product: ProductI = data.payload.doc.data() as ProductI;
            product.id = data.payload.doc.id;
            // console.log(data);
            return product;
          }
        );
      }));

  }

  getProductsByUserUid(uidCurrentUser) {

    return this.db.collection('products', ref => ref.where('owner', '==', uidCurrentUser))
      .snapshotChanges()
      .pipe(map(products => {
        return products.map(
          (data) => {
            const product: ProductI = data.payload.doc.data() as ProductI;
            product.id = data.payload.doc.id;
            return product;
          }
        );
      }));

  }

  getProductsByAccountNumber(accountNumber) {

    return this.db.collection('products', ref => ref.where('account_number', '==', accountNumber))
      .snapshotChanges()
      .pipe(map(products => {
        return products.map(
          (data) => {
            const product: ProductI = data.payload.doc.data() as ProductI;
            product.id = data.payload.doc.id;
            return product;
          }
        );
      }));

  }

  getProductById(idProduct) {

    return this.db.collection('products').doc(idProduct).get();

  }

  addBalanceProductById(idProduct, amount, currency) {

    if (currency === 'cop' || currency === 'usd') {
      this.getProductById(idProduct).subscribe(
        response => {
          if (currency === 'cop') {
            let newBalance: number = response.data().balance_cop * 1;
            newBalance += amount;
            this.db.collection('products').doc(idProduct).update({
              balance_cop: newBalance
            });
          } else {
            let newBalance: number = response.data().balance_usd * 1;
            newBalance += amount;
            this.db.collection('products').doc(idProduct).update({
              balance_usd: newBalance
            });
          }
        }
      );
    }

  }

  subBalanceProductById(idProduct, amount, currency) {

    if (currency === 'cop' || currency === 'usd') {
      this.getProductById(idProduct).subscribe(
        response => {
          if (currency === 'cop') {
            const newBalance: number = response.data().balance_cop - amount;
            this.db.collection('products').doc(idProduct).update({
              balance_cop: newBalance
            });
          } else {
            const newBalance: number = response.data().balance_usd - amount;
            this.db.collection('products').doc(idProduct).update({
              balance_usd: newBalance
            });
          }
        }
      );
    }

  }

}
