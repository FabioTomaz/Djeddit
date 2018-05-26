import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {FormsModule} from "@angular/forms";
import { NewPostsComponent } from './new-posts/new-posts.component';
import { PostPreviewComponent } from './post-preview/post-preview.component';
import { TopicPreviewComponent } from './topic-preview/topic-preview.component';
import { ProfilePreviewComponent } from './profile-preview/profile-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    NewPostsComponent,
    PostPreviewComponent,
    TopicPreviewComponent,
    ProfilePreviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
