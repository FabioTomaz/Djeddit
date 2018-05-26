import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPreviewComponent } from './report-preview.component';

describe('ReportPreviewComponent', () => {
  let component: ReportPreviewComponent;
  let fixture: ComponentFixture<ReportPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
