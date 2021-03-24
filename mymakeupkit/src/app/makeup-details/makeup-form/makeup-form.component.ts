import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { Makeup } from 'src/app/shared/makeup';

@Component({
  selector: 'ae-makeup-form',
  templateUrl: './makeup-form.component.html',
  styleUrls: ['./makeup-form.component.css']
})
export class MakeupFormComponent implements OnInit {
  @Input() makeup: Makeup | undefined;
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
    console.warn(this.form.value);
  }

  cancel(): void {
    this.location.back();
  }

}
