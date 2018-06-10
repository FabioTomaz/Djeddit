import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicCreationStatusComponent } from './topic-creation-status.component';

describe('TopicCreationStatusComponent', () => {
  let component: TopicCreationStatusComponent;
  let fixture: ComponentFixture<TopicCreationStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicCreationStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicCreationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
