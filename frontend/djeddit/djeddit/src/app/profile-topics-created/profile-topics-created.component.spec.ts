import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTopicsCreatedComponent } from './profile-topics-created.component';

describe('ProfileTopicsCreatedComponent', () => {
  let component: ProfileTopicsCreatedComponent;
  let fixture: ComponentFixture<ProfileTopicsCreatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileTopicsCreatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileTopicsCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
