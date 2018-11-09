import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyRestorePasswordComponent } from './verify-restore-password.component';

describe('VerifyRestorePasswordComponent', () => {
  let component: VerifyRestorePasswordComponent;
  let fixture: ComponentFixture<VerifyRestorePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyRestorePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyRestorePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
