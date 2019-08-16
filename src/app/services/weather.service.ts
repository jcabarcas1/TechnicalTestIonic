import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private API_URL = 'https://samples.openweathermap.org/data/2.5/weather?';

  constructor(private http: HTTP) { }

  public getWeatherByLatitudeAndLongitude(latitude, longitude) {

    return this.http.get(this.API_URL +
      'lat=' + latitude +
      '&lon=' + longitude +
      '&appid=b6907d289e10d714a6e88b30761fae22', {}, {});

  }

}
