import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {NewPostsComponent} from "../new-posts/new-posts.component";

const routes: Routes = [
  {path: '', redirectTo: '/new', pathMatch : 'full'},
  {path: 'new', component: NewPostsComponent},
  {path: 'popular', component: NewPostsComponent},
  {path: 'top_rated', component: NewPostsComponent},
  {path: 'controversial', component: NewPostsComponent}
];

@NgModule({
  imports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
