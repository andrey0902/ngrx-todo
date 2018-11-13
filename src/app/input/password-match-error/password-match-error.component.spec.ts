import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordMatchErrorComponent } from './password-match-error.component';

describe('PasswordMatchErrorComponent', () => {
  let component: PasswordMatchErrorComponent;
  let fixture: ComponentFixture<PasswordMatchErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordMatchErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordMatchErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
