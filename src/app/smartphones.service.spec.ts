import { TestBed } from '@angular/core/testing';

import { SmartphonesService } from './smartphones.service';

describe('SmartphonesService', () => {
  let service: SmartphonesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmartphonesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
