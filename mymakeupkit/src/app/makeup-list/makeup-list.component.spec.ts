import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeupListComponent } from './makeup-list.component';

describe('MakeupListComponent', () => {
  let component: MakeupListComponent;
  let fixture: ComponentFixture<MakeupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeupListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
