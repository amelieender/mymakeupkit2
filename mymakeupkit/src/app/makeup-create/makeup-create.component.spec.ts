import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeupCreateComponent } from './makeup-create.component';

describe('MakeupCreateComponent', () => {
  let component: MakeupCreateComponent;
  let fixture: ComponentFixture<MakeupCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeupCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeupCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
