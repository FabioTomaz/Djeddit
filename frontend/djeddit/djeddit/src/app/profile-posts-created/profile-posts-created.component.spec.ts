import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePostsCreatedComponent } from './profile-posts-created.component';

describe('ProfilePostsCreatedComponent', () => {
  let component: ProfilePostsCreatedComponent;
  let fixture: ComponentFixture<ProfilePostsCreatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePostsCreatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePostsCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
