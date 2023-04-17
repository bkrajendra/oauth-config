import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AutoLoginPartialRoutesGuard } from 'angular-auth-oidc-client';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { CallbackComponent } from './callback/callback.component';

const routes: Routes = [
  {path:"", pathMatch:"full", redirectTo:"home"},
  {path:"home", component:HomeComponent, canActivate:[AutoLoginPartialRoutesGuard]},
  {path:"protected", component:DashboardComponent,canActivate:[AutoLoginPartialRoutesGuard]},
  {path:"forbidden", component:ForbiddenComponent, canActivate: [AutoLoginPartialRoutesGuard]},
  {path:"unauthorized", component:UnauthorizedComponent},
  {path:"callback", component:CallbackComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
