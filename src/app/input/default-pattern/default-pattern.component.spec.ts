import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultPatternComponent } from './default-pattern.component';

describe('DefaultPatternComponent', () => {
  let component: DefaultPatternComponent;
  let fixture: ComponentFixture<DefaultPatternComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultPatternComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
