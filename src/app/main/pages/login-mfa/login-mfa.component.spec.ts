import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMfaComponent } from './login-mfa.component';

describe('LoginMfaComponent', () => {
  let component: LoginMfaComponent;
  let fixture: ComponentFixture<LoginMfaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginMfaComponent]
    });
    fixture = TestBed.createComponent(LoginMfaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
