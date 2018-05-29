import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePostsHiddenComponent } from './profile-posts-hidden.component';

describe('ProfilePostsHiddenComponent', () => {
  let component: ProfilePostsHiddenComponent;
  let fixture: ComponentFixture<ProfilePostsHiddenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePostsHiddenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePostsHiddenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
