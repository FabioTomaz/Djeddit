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
import {UserEditComponent} from "../user-edit/user-edit.component";
import {UserPrivacyComponent} from "../user-privacy/user-privacy.component";
import {ChangePasswordComponent} from "../change-password/change-password.component";

const routes: Routes = [
  {path: 'new', component: NewPostsComponent, data: {'order': 'new'}, runGuardsAndResolvers: 'always'},
  {path: 'popular', component: NewPostsComponent, data: {'order': 'popular'}},
  {path: 'top_rated', component: NewPostsComponent, data: {'order': 'top_rated'}},
  {path: 'controversial', component: NewPostsComponent, data: {'order': 'controversial'}},
  {path: 'topic/:topic_name', component: TopicPageComponent},
  {path: 'topic/:topic_name/post/:post_id', component: PostPageComponent},
  {path: 'search/topic', component: SearchTopicComponent, runGuardsAndResolvers: 'paramsOrQueryParamsChange'},
  {path: 'search/post', component: SearchPostComponent, runGuardsAndResolvers: 'paramsOrQueryParamsChange'},
  {path: 'search/user', component: SearchUserComponent, runGuardsAndResolvers: 'paramsOrQueryParamsChange'},

  {path: 'user/:username/page', component: ProfilePageComponent},
  {path: 'user/:username/friends', component: ProfileFriendsComponent},
  {path: 'user/:username/posts/created', component: ProfilePostsCreatedComponent},
  {path: 'user/:username/posts/saved', component: ProfilePostsSavedComponent},
  {path: 'user/:username/posts/hidden', component: ProfilePostsHiddenComponent},
  {path: 'user/:username/posts/upvoted', component: ProfilePostsUpvotedComponent},
  {path: 'user/:username/posts/downvoted', component: ProfilePostsDownvotedComponent},
  {path: 'user/:username/topics/created', component: ProfileTopicsCreatedComponent},
  {path: 'user/:username/topics/subscribed', component: ProfileTopicsSubscribedComponent},
  {path: 'user/:username/comments/created', component: ProfileCommentsComponent},
  {path: 'user/:username/comments/upvoted', component: ProfileCommentsUpvotedComponent},
  {path: 'user/:username/comments/downvoted', component: ProfileCommentsDownvotedComponent},
  {path: 'user/:username/edit', component: UserEditComponent},
  {path: 'user/:username/privacy', component: UserPrivacyComponent},
  {path: 'user/:username/change_password', component: ChangePasswordComponent},
  {path: 'user/:username/', redirectTo: 'user/:username/page', pathMatch: 'full'},

  {path: 'search', redirectTo: '/search/post?q=', pathMatch : 'full'},
  {path: '', redirectTo: '/new', pathMatch : 'full'},
  {path: '**', redirectTo: '/new', pathMatch : 'full'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  declarations: []
})
export class AppRoutingModule { }
