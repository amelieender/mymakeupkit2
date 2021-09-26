import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate, Location } from '@angular/common';
import { Makeup } from 'src/app/shared/makeup';
import { Observable, Subject } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';
import { throttle } from 'lodash';

@Component({
  selector: 'ae-makeup-form',
  templateUrl: './makeup-form.component.html',
  styleUrls: ['./makeup-form.component.css']
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
  takePhoto: Function = throttle(() => this.photoTrigger.next(), 500)

  constructor(private fb: FormBuilder, private location: Location) {
    this.form = this.fb.group(
      {
        idControl: [''],
        productnameControl: ['', Validators.required],
        brandnameControl: ['', Validators.required],
        categoryControl: ['', Validators.required],
        openedControl: [''],
        durabilityControl: [''],
      }
    );
  }

  public get photoTriggerObservable(): Observable<void> {
    return this.photoTrigger.asObservable();
  }

  get imageSource(): string {
    return this.imageSourceString;
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
    console.log(this.makeup)
    if (this.makeup.image) {
      this.imageSourceString = `data:image/jpeg;base64,${this.makeup.image}`;
    }
  }

  handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    console.log(webcamImage.imageAsDataUrl);
    // this.imageSourceBlob = webcamImage.imageAsDataUrl;
    this.webcamImage = webcamImage;
    this.imageSourceString = this.webcamImage.imageAsDataUrl;
  }

  onSubmit(): void {
    const values = this.form.value;
    // convert to mysql accepted date format
    const date = values.openedControl ? formatDate(values.openedControl, 'yyyy-MM-dd', 'en') : undefined;
    this.makeup = {
      id: values.idControl,
      productname: values.productnameControl,
      brandname: values.brandnameControl,
      category: values.categoryControl,
      opened: date,
      durability: values.durabilityControl,
      image: this.webcamImage?.imageAsBase64
    };
    this.updateEvent.emit(this.makeup);
  }

  cancel(): void {
    this.location.back();
  }

}
