import { TestBed } from '@angular/core/testing';

import { AppNavigationService } from './app-navigation.service';

describe('ActiveRoutesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppNavigationService = TestBed.get(AppNavigationService);
    expect(service).toBeTruthy();
  });
});
