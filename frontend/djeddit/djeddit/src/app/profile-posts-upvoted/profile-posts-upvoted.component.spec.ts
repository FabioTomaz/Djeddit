import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePostsUpvotedComponent } from './profile-posts-upvoted.component';

describe('ProfilePostsUpvotedComponent', () => {
  let component: ProfilePostsUpvotedComponent;
  let fixture: ComponentFixture<ProfilePostsUpvotedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePostsUpvotedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePostsUpvotedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
