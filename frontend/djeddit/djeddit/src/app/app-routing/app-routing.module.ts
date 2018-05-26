import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NewPostsComponent} from '../new-posts/new-posts.component';
import {TopicPageComponent} from '../topic-page/topic-page.component';
import {PostPageComponent} from '../post-page/post-page.component';

const routes: Routes = [
  {path: '', redirectTo: '/new', pathMatch : 'full'},
  {path: 'new', component: NewPostsComponent},
  {path: 'popular', component: NewPostsComponent},
  {path: 'top_rated', component: NewPostsComponent},
  {path: 'controversial', component: NewPostsComponent},
  {path: 'topic/:topic_name', component: TopicPageComponent},
  {path: 'topic/:topic_name/post/:post_id', component: PostPageComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
