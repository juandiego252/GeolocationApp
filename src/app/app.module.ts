import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// geolocation and native-geocoder
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

// AngularFire imports
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyAKVDbIbWEKT_ygujrVgKERkDrTD3U8rto',
      authDomain: 'gps-firebase-fce0f.firebaseapp.com',
      projectId: 'gps-firebase-fce0f',
      storageBucket: 'gps-firebase-fce0f.appspot.com',
      messagingSenderId: '992015848614',
      appId: '1:992015848614:web:565ff6b0be2ef745135067',
    }),
    AngularFirestoreModule,
  ],
  providers: [
    Geolocation,
    NativeGeocoder,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
