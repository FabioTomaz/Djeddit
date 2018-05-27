import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {FormsModule} from "@angular/forms";
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
import { SearchComponent } from './search/search.component';
import { SearchPostComponent } from './search-post/search-post.component';
import { SearchTopicComponent } from './search-topic/search-topic.component';
import { SearchUserComponent } from './search-user/search-user.component';

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
    SearchComponent,
    SearchPostComponent,
    SearchTopicComponent,
    SearchUserComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
