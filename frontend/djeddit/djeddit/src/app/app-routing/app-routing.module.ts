import { NgModule } from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {NewPostsComponent} from '../new-posts/new-posts.component';
import {TopicPageComponent} from '../topic-page/topic-page.component';
import {PostPageComponent} from '../post-page/post-page.component';
import {SearchTopicComponent} from "../search-topic/search-topic.component";
import {SearchPostComponent} from "../search-post/search-post.component";
import {SearchUserComponent} from "../search-user/search-user.component";
import {ProfilePageComponent} from "../profile-page/profile-page.component";
import {ProfileComponent} from "../profile/profile.component";
import {ProfileCommentsComponent} from "../profile-comments/profile-comments.component";
import {ProfileCommentsUpvotedComponent} from "../profile-comments-upvoted/profile-comments-upvoted.component";
import {ProfileCommentsDownvotedComponent} from "../profile-comments-downvoted/profile-comments-downvoted.component";
import {ProfileTopicsCreatedComponent} from "../profile-topics-created/profile-topics-created.component";
import {ProfileTopicsSubscribedComponent} from "../profile-topics-subscribed/profile-topics-subscribed.component";
import {ProfilePostsSavedComponent} from "../profile-posts-saved/profile-posts-saved.component";
import {ProfilePostsHiddenComponent} from "../profile-posts-hidden/profile-posts-hidden.component";
import {ProfilePostsUpvotedComponent} from "../profile-posts-upvoted/profile-posts-upvoted.component";
import {ProfilePostsDownvotedComponent} from "../profile-posts-downvoted/profile-posts-downvoted.component";
import {ProfileFriendsComponent} from "../profile-friends/profile-friends.component";
import {ProfilePostsCreatedComponent} from "../profile-posts-created/profile-posts-created.component";

const routes: Routes = [
  {path: 'new', component: NewPostsComponent, data: {'order': 'new'}},
  {path: 'popular', component: NewPostsComponent, data: {'order': 'popular'}},
  {path: 'top_rated', component: NewPostsComponent, data: {'order': 'top_rated'}},
  {path: 'controversial', component: NewPostsComponent, data: {'order': 'controversial'}},
  {path: 'topic/:topic_name', component: TopicPageComponent},
  {path: 'topic/:topic_name/post/:post_id', component: PostPageComponent},
  {path: 'search/topic', component: SearchTopicComponent},
  {path: 'search/post', component: SearchPostComponent},
  {path: 'search/user', component: SearchUserComponent},
  {
    path: 'user/:username',
    component: ProfileComponent,
    children: [
      {path: 'page', component: ProfilePageComponent},
      {path: 'friends', component: ProfileFriendsComponent},
      {path: 'posts/created', component: ProfilePostsCreatedComponent},
      {path: 'posts/saved', component: ProfilePostsSavedComponent},
      {path: 'posts/hidden', component: ProfilePostsHiddenComponent},
      {path: 'posts/upvoted', component: ProfilePostsUpvotedComponent},
      {path: 'posts/downvoted', component: ProfilePostsDownvotedComponent},
      {path: 'topics/created', component: ProfileTopicsCreatedComponent},
      {path: 'topics/subscribed', component: ProfileTopicsSubscribedComponent},
      {path: 'comments/created', component: ProfileCommentsComponent},
      {path: 'comments/upvoted', component: ProfileCommentsUpvotedComponent},
      {path: 'comments/downvoted', component: ProfileCommentsDownvotedComponent},
      {path: '', redirectTo: 'page', pathMatch : 'full'},
    ]
  },
  {path: 'search', redirectTo: '/search/post?q=', pathMatch : 'full'},
  {path: '', redirectTo: '/new', pathMatch : 'full'},
  {path: '**', redirectTo: '/new', pathMatch : 'full'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
