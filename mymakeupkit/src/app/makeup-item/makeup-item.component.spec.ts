import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeupItemComponent } from './makeup-item.component';

describe('MakeupItemComponent', () => {
  let component: MakeupItemComponent;
  let fixture: ComponentFixture<MakeupItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeupItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeupItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
