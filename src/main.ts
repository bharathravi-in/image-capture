import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';

import { WebcamModule } from 'ngx-webcam';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, WebcamModule],
  template: `
  <div class="container mt-5">
  <h2>Angular Webcam Capture Image from Camera</h2>
  <div class="col-md-12">
    <webcam
      [trigger]="invokeObservable"
      (imageCapture)="captureImg($event)"
    ></webcam>
  </div>
  <div class="col-md-12">
    <button class="btn btn-danger" (click)="getSnapshot()">
      Capture Image
    </button>
  </div>
  <div class="col-12">
    <div id="results">Your taken image manifests here...</div>
    <img [src]="webcamImage.imageAsDataUrl" height="400px" />
  </div>
</div>
  `,
})
export class App {
  name = 'Angular';
  private trigger: Subject<any> = new Subject();
  public webcamImage!: WebcamImage;
  private nextWebcam: Subject<any> = new Subject();
  sysImage = '';
  ngOnInit() {}
  public getSnapshot(): void {
    this.trigger.next(void 0);
  }
  public captureImg(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.sysImage = webcamImage!.imageAsDataUrl;
    console.info('got webcam image', this.sysImage);
  }
  public get invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }
  public get nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }
}

bootstrapApplication(App);
