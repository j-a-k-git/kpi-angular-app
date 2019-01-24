import { TestBed } from '@angular/core/testing';

import { ActiveRoutesService } from './active-routes.service';

describe('ActiveRoutesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActiveRoutesService = TestBed.get(ActiveRoutesService);
    expect(service).toBeTruthy();
  });
});
