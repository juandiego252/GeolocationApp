import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  latitude: any = 0; // latitude
  longitude: any = 0; // longitude
  address: string;

  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private firestore: AngularFirestore
  ) {}

  // geolocation options
  options = {
    timeout: 10000,
    enableHighAccuracy: true,
    maximumAge: 3600,
  };

  // use geolocation to get user's device coordinates
  getCurrentCoordinates() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        console.log(resp);
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        this.saveLocation(this.latitude, this.longitude);
        this.getAddress(this.latitude, this.longitude);
      })
      .catch((error) => {
        console.log('Error getting location', error);
      });
  }

  // geocoder options
  nativeGeocoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5,
  };

  // get address using coordinates
  getAddress(lat: any, long: any) {
    this.nativeGeocoder
      .reverseGeocode(lat, long, this.nativeGeocoderOptions)
      .then((res: NativeGeocoderResult[]) => {
        this.address = this.pretifyAddress(res[0]);
      })
      .catch((error: any) => {
        alert('Error getting location' + JSON.stringify(error));
      });
  }

  // address
  pretifyAddress(address: any) {
    let obj = [];
    let data = '';
    for (let key in address) {
      obj.push(address[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if (obj[val].length) data += obj[val] + ', ';
    }
    return address.slice(0, -2);
  }

  // save location to Firestore
  saveLocation(lat: number, long: number) {
    const locationData = {
      latitude: lat,
      longitude: long,
      timestamp: new Date()
    };

    this.firestore.collection('localizacion').add(locationData).then(() => {
      console.log('Location saved to Firestore');
    }).catch(error => {
      console.error('Error saving location to Firestore', error);
    });
  }
}
