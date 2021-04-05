import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate, Location } from '@angular/common';
import { Makeup } from 'src/app/shared/makeup';

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

  ngOnInit(): void {
    this.form.patchValue({
      idControl: this.makeup?.id,
      productnameControl: this.makeup?.productname,
      brandnameControl: this.makeup?.brandname,
      categoryControl: this.makeup?.category,
      openedControl: this.makeup?.opened,
      durabilityControl: this.makeup?.durability,
    });
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
      durability: values.durabilityControl
    };
    this.updateEvent.emit(this.makeup);
  }

  cancel(): void {
    this.location.back();
  }

}
