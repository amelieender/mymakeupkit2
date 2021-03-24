import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { Makeup } from 'src/app/shared/makeup';

@Component({
  selector: 'ae-makeup-form',
  templateUrl: './makeup-form.component.html',
  styleUrls: ['./makeup-form.component.css']
})
export class MakeupFormComponent implements OnInit {
  @Input() makeup!: Makeup;
  @Output() updateEvent = new EventEmitter<Makeup>();
  form: FormGroup;

  constructor(private fb: FormBuilder, private location: Location) {
    this.form = this.fb.group(
      {
        idControl: ['', Validators.required],
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
    console.log("submit");
    const values = this.form.value;
    console.log(values);
    this.makeup.id = values.idControl;
    this.makeup.productname = values.productnameControl;
    this.makeup.brandname = values.brandnameControl;
    this.makeup.category = values.categoryControl;
    this.makeup.opened = values.openedControl;
    this.makeup.durability = values.durabilityControl;
    this.updateEvent.emit(this.makeup);
  }

  cancel(): void {
    this.location.back();
  }

}
