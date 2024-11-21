import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';
import { CameraService } from '../services/camera.service';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, NgIf],
})
export class HomePage {
  capturedImage?: string;
  currentLocation?: { latitude: number; longitude: number };

  constructor(private cameraService: CameraService, private locationService: LocationService) {}

  async takePicture() {
    this.capturedImage = await this.cameraService.takePicture();
  }

  async getLocation() {
    try {
      const coordinates = await this.locationService.getCurrentPosition();
      this.currentLocation = {
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude
      };
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
