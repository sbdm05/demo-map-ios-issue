import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, Platform } from '@ionic/angular/standalone';
import { GoogleMap } from '@capacitor/google-maps';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage {
  @ViewChild('map') mapRef!: ElementRef<HTMLElement>;
  //@Input() datas!: any[];
  private api_key: string = 'API_KEY';
  private newMap!: GoogleMap;
  constructor(private platform: Platform) {}

  // ngOnInit() {

  // }



  async createMap() {
    // on crée une carte
    //console.log(this.mapRef.nativeElement, 'native');

    console.log('testAPIKEY');
    // create a new map
    this.newMap = await GoogleMap.create({
      id: 'my-map',
      element: this.mapRef.nativeElement,
      apiKey: 'AIzaSyCPLwGXnUjTxgSk60GIqoSXI4YpvVLocYE',
      config: {
        center: {
          lat: 48.992128,
          lng: 2.2779189,
        },
        zoom: 12,
      },
    });
    console.log(this.newMap, 'newMap');
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      console.log('platform is ready');

      if (this.platform.is('ios')) {
        console.log('map inside ios');
        //this.api_key = environment.GOOGLE_MAP_API_KEY_IOS;
        this.createMap();
      } else if (this.platform.is('android')) {
        console.log('map inside android');
        //this.api_key = environment.GOOGLE_MAP_API_KEY_ANDROID;
        this.createMap();
      } else {
        console.log('inside else');
        //this.api_key = environment.GOOGLE_MAP_TEST;
        console.log(this.api_key);
        this.createMap();
      }
    });
  }
}
