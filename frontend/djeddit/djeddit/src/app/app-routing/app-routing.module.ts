import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NewPostsComponent} from '../new-posts/new-posts.component';
import {TopicPageComponent} from '../topic-page/topic-page.component';
import {PostPageComponent} from '../post-page/post-page.component';
import {SearchTopicComponent} from "../search-topic/search-topic.component";
import {SearchPostComponent} from "../search-post/search-post.component";
import {SearchUserComponent} from "../search-user/search-user.component";

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
  {path: 'search', redirectTo: '/search/post?q=', pathMatch : 'full'},
  {path: '', redirectTo: '/new', pathMatch : 'full'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
