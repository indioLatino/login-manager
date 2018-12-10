import { TestBed } from '@angular/core/testing';

import { CognitoErrorManagerService } from './cognito-error-manager.service';

describe('CognitoErrorManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CognitoErrorManagerService = TestBed.get(CognitoErrorManagerService);
    expect(service).toBeTruthy();
  });
});
