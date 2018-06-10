import {BrowserModule, Title} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NewPostsComponent } from './new-posts/new-posts.component';
import { PostPreviewComponent } from './post-preview/post-preview.component';
import { TopicPreviewComponent } from './topic-preview/topic-preview.component';
import { ProfilePreviewComponent } from './profile-preview/profile-preview.component';
import { ReportPreviewComponent } from './report-preview/report-preview.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import { TopicPageComponent } from './topic-page/topic-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { SearchPostComponent } from './search-post/search-post.component';
import { SearchTopicComponent } from './search-topic/search-topic.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { PostListComponent } from './post-list/post-list.component';
import { ProfileTopicsCreatedComponent } from './profile-topics-created/profile-topics-created.component';
import { ProfileTopicsSubscribedComponent } from './profile-topics-subscribed/profile-topics-subscribed.component';
import { ProfileCommentsComponent } from './profile-comments/profile-comments.component';
import { ProfileCommentsUpvotedComponent } from './profile-comments-upvoted/profile-comments-upvoted.component';
import { ProfileCommentsDownvotedComponent } from './profile-comments-downvoted/profile-comments-downvoted.component';
import { ProfilePostsCreatedComponent } from './profile-posts-created/profile-posts-created.component';
import { ProfilePostsSavedComponent } from './profile-posts-saved/profile-posts-saved.component';
import { ProfilePostsHiddenComponent } from './profile-posts-hidden/profile-posts-hidden.component';
import { ProfilePostsUpvotedComponent } from './profile-posts-upvoted/profile-posts-upvoted.component';
import { ProfilePostsDownvotedComponent } from './profile-posts-downvoted/profile-posts-downvoted.component';
import { ProfileFriendsComponent } from './profile-friends/profile-friends.component';
import { CommentPreviewComponent } from './comment-preview/comment-preview.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { TopicListComponent } from './topic-list/topic-list.component';
import { PostCommentSectionComponent } from './post-comment-section/post-comment-section.component';
import { CreateTopicComponent } from './create-topic/create-topic.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { ReportPostComponent } from './report-post/report-post.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserPrivacyComponent } from './user-privacy/user-privacy.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { PostCreationStatusComponent } from './post-creation-status/post-creation-status.component';
import { TopicCreationStatusComponent } from './topic-creation-status/topic-creation-status.component';
import { ReportPostConfirmationComponent } from './report-post-confirmation/report-post-confirmation.component';
import { ReportListComponent } from './report-list/report-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NewPostsComponent,
    PostPreviewComponent,
    TopicPreviewComponent,
    ProfilePreviewComponent,
    ReportPreviewComponent,
    AppNavbarComponent,
    TopicPageComponent,
    PostPageComponent,
    SearchPostComponent,
    SearchTopicComponent,
    SearchUserComponent,
    ProfileComponent,
    ProfilePageComponent,
    PostListComponent,
    ProfileTopicsCreatedComponent,
    ProfileTopicsSubscribedComponent,
    ProfileCommentsComponent,
    ProfileCommentsUpvotedComponent,
    ProfileCommentsDownvotedComponent,
    ProfilePostsCreatedComponent,
    ProfilePostsSavedComponent,
    ProfilePostsHiddenComponent,
    ProfilePostsUpvotedComponent,
    ProfilePostsDownvotedComponent,
    ProfileFriendsComponent,
    CommentPreviewComponent,
    CommentListComponent,
    TopicListComponent,
    PostCommentSectionComponent,
    ChangePasswordComponent,
    UserPrivacyComponent,
    UserEditComponent,
    CreateTopicComponent,
    CreatePostComponent,
    ReportPostComponent,
    PostCreationStatusComponent,
    TopicCreationStatusComponent,
    ReportPostConfirmationComponent,
    ReportListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
