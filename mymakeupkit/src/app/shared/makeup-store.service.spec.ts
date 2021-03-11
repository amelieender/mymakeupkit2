import { TestBed } from '@angular/core/testing';

import { MakeupStoreService } from './makeup-store.service';

describe('MakeupStoreService', () => {
  let service: MakeupStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MakeupStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
