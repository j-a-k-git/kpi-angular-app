import { TestBed } from '@angular/core/testing';

import { LoadingIndicatorInterceptor } from './loading-indicator.interceptor';

describe('LoadingIndicatoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadingIndicatorInterceptor = TestBed.get(LoadingIndicatorInterceptor);
    expect(service).toBeTruthy();
  });
});
