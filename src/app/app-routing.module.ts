import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from './page404/page404.component';
import { ListsComponent } from './lists/lists.component';

const routes: Routes = [
  { path:'lists', component : ListsComponent },
  { path:'', redirectTo:'/lists', pathMatch:'full' },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports:  [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
