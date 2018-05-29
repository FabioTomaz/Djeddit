import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCommentsUpvotedComponent } from './profile-comments-upvoted.component';

describe('ProfileCommentsUpvotedComponent', () => {
  let component: ProfileCommentsUpvotedComponent;
  let fixture: ComponentFixture<ProfileCommentsUpvotedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCommentsUpvotedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCommentsUpvotedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
