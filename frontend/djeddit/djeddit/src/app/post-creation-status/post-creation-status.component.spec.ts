import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCreationStatusComponent } from './post-creation-status.component';

describe('PostCreationStatusComponent', () => {
  let component: PostCreationStatusComponent;
  let fixture: ComponentFixture<PostCreationStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostCreationStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCreationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
