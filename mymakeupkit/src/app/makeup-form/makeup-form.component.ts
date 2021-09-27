import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate, Location } from '@angular/common';
import { Makeup } from 'src/app/shared/makeup';
import { Observable, Subject } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';
import { throttle } from 'lodash';
import { GeolocationService } from '@ng-web-apis/geolocation';
import { take } from 'rxjs/operators';

// typescript version was too old to have this
// @see https://stackoverflow.com/questions/65916073/angular-11-why-cant-the-compiler-find-geolocationposition-during-compiling
interface GeolocationCoordinates {
  readonly accuracy: number;
  readonly altitude: number | null;
  readonly altitudeAccuracy: number | null;
  readonly heading: number | null;
  readonly latitude: number;
  readonly longitude: number;
  readonly speed: number | null;
}

interface GeolocationPosition {
  readonly coords: GeolocationCoordinates;
  readonly timestamp: DOMTimeStamp;
}

interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

@Component({
  selector: 'ae-makeup-form',
  templateUrl: './makeup-form.component.html',
  styleUrls: ['./makeup-form.component.css'],
})
export class MakeupFormComponent implements OnInit {
  @Input() makeup!: Makeup;
  @Input() submitLabel: string = 'Submit';
  @Output() updateEvent = new EventEmitter<Makeup>();
  form: FormGroup;
  photoTrigger: Subject<void> = new Subject<void>();
  // latest snapshot
  webcamImage: WebcamImage | null = null;
  imageSourceString: string = '';
  takePhoto: Function = throttle(() => this.photoTrigger.next(), 500);
  geoPosition: GeoCoordinates | null = null;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    public readonly geolocation$: GeolocationService
  ) {
    this.form = this.fb.group({
      idControl: [''],
      productnameControl: ['', Validators.required],
      brandnameControl: ['', Validators.required],
      categoryControl: ['', Validators.required],
      openedControl: [''],
      durabilityControl: [''],
    });
  }

  getPosition(): void {
    this.geolocation$
      .pipe(take(1))
      .subscribe((pos: GeolocationPosition) => {
        this.geoPosition = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        };
      });
  }

  public get photoTriggerObservable(): Observable<void> {
    return this.photoTrigger.asObservable();
  }

  get imageSource(): string {
    return this.imageSourceString;
  }

  get mapUrl(): string {
    return `https://www.openstreetmap.org/?mlat=${this.geoPosition!.latitude}&mlon=${this.geoPosition!.longitude}`
  }

  ngOnInit(): void {
    this.form.patchValue({
      idControl: this.makeup?.id,
      productnameControl: this.makeup?.productname,
      brandnameControl: this.makeup?.brandname,
      categoryControl: this.makeup?.category,
      openedControl: this.makeup?.opened,
      durabilityControl: this.makeup?.durability,
    });

    if (this.makeup?.latitude && this.makeup?.longitude) {
      this.geoPosition = {
        latitude: this.makeup.latitude,
        longitude: this.makeup.longitude
      };
    }

    if (this.makeup?.image) {
      this.imageSourceString = `data:image/jpeg;base64,${this.makeup.image}`;
    }
  }

  handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    console.log(webcamImage.imageAsDataUrl);
    this.webcamImage = webcamImage;
    this.imageSourceString = this.webcamImage.imageAsDataUrl;
  }

  onSubmit(): void {
    const values = this.form.value;
    // convert to mysql accepted date format
    const date = values.openedControl
      ? formatDate(values.openedControl, 'yyyy-MM-dd', 'en')
      : undefined;
    this.makeup = {
      id: values.idControl,
      productname: values.productnameControl,
      brandname: values.brandnameControl,
      category: values.categoryControl,
      opened: date,
      durability: values.durabilityControl,
      image: this.webcamImage?.imageAsBase64,
    };
    if (this.geoPosition) {
      this.makeup.latitude = this.geoPosition.latitude;
      this.makeup.longitude = this.geoPosition.longitude;
    }
    this.updateEvent.emit(this.makeup);
  }

  cancel(): void {
    this.location.back();
  }
}
