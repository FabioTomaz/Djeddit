import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCommentSectionComponent } from './post-comment-section.component';

describe('PostCommentSectionComponent', () => {
  let component: PostCommentSectionComponent;
  let fixture: ComponentFixture<PostCommentSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostCommentSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCommentSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
