import {Component, OnInit} from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import {WeatherService} from '../../services/weather.service';
import {AuthService} from '../../services/auth.service';
import {ProductsService} from '../../services/products.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {

  weather = 0;
  username = '';
  savingProducts: any = [];
  checkingProducts: any = [];

  constructor(private geolocation: Geolocation,
              private weatherService: WeatherService,
              private authService: AuthService,
              private productsService: ProductsService) {


  }

  ngOnInit() {
    this.username = this.authService.getUserLogged().email.split('@')[0];

    // Get Saving accounts
    this.productsService.getProductsByUserUidAndType(this.authService.getUserLogged().uid, 'saving').subscribe(
      (response) => {
        this.savingProducts = response;
      }
    );

    // Get Checking accounts
    this.productsService.getProductsByUserUidAndType(this.authService.getUserLogged().uid, 'checking').subscribe(
      (response) => {
        this.checkingProducts = response;
      }
    );

    // Get Temperature
    this.geolocation.getCurrentPosition().then(
      (resp) => {

        const latitude = resp.coords.latitude;
        const longitude = resp.coords.longitude;

        this.weatherService.getWeatherByLatitudeAndLongitude(latitude, longitude)
          .then(data => {
              console.log('RESP' , JSON.parse(data.data))
              this.weather = JSON.parse(data.data).main.temp;
            }
          )
          .catch(
            error => {
              console.log(error);
            }
          );
      }
    ).catch(
      (error) => {
        console.log('Error getting location', error);
      }
    );

  }

}
