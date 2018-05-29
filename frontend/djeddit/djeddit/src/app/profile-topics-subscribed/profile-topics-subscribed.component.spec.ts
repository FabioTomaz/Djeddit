import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTopicsSubscribedComponent } from './profile-topics-subscribed.component';

describe('ProfileTopicsSubscribedComponent', () => {
  let component: ProfileTopicsSubscribedComponent;
  let fixture: ComponentFixture<ProfileTopicsSubscribedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileTopicsSubscribedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileTopicsSubscribedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
