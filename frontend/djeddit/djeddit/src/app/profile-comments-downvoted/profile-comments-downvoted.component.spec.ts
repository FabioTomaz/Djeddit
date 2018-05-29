import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCommentsDownvotedComponent } from './profile-comments-downvoted.component';

describe('ProfileCommentsDownvotedComponent', () => {
  let component: ProfileCommentsDownvotedComponent;
  let fixture: ComponentFixture<ProfileCommentsDownvotedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCommentsDownvotedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCommentsDownvotedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
