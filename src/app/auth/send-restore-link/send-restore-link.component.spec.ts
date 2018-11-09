import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendRestorLinkComponent } from './send-restore-link.component';

describe('SendRestorLinkComponent', () => {
  let component: SendRestorLinkComponent;
  let fixture: ComponentFixture<SendRestorLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendRestorLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendRestorLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
