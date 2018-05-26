import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicPreviewComponent } from './topic-preview.component';

describe('TopicPreviewComponent', () => {
  let component: TopicPreviewComponent;
  let fixture: ComponentFixture<TopicPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
