import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePostsDownvotedComponent } from './profile-posts-downvoted.component';

describe('ProfilePostsDownvotedComponent', () => {
  let component: ProfilePostsDownvotedComponent;
  let fixture: ComponentFixture<ProfilePostsDownvotedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePostsDownvotedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePostsDownvotedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
