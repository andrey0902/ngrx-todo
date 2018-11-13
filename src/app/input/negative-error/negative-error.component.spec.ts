import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NegativeErrorComponent } from './negative-error.component';

describe('NegativeErrorComponent', () => {
  let component: NegativeErrorComponent;
  let fixture: ComponentFixture<NegativeErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NegativeErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NegativeErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
