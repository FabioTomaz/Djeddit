import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPostConfirmationComponent } from './report-post-confirmation.component';

describe('ReportPostConfirmationComponent', () => {
  let component: ReportPostConfirmationComponent;
  let fixture: ComponentFixture<ReportPostConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportPostConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPostConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
