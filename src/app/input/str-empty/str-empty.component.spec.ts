import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrEmptyComponent } from './str-empty.component';

describe('StrEmptyComponent', () => {
  let component: StrEmptyComponent;
  let fixture: ComponentFixture<StrEmptyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrEmptyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
