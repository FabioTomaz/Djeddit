import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDeleteConfirmComponent } from './post-delete-confirm.component';

describe('PostDeleteConfirmComponent', () => {
  let component: PostDeleteConfirmComponent;
  let fixture: ComponentFixture<PostDeleteConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostDeleteConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDeleteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
