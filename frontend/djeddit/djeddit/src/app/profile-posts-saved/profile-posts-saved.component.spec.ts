import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePostsSavedComponent } from './profile-posts-saved.component';

describe('ProfilePostsSavedComponent', () => {
  let component: ProfilePostsSavedComponent;
  let fixture: ComponentFixture<ProfilePostsSavedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePostsSavedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePostsSavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
