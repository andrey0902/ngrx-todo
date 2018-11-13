import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlPatternErrorComponent } from './url-pattern-error.component';

describe('UrlPatternErrorComponent', () => {
  let component: UrlPatternErrorComponent;
  let fixture: ComponentFixture<UrlPatternErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlPatternErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlPatternErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
