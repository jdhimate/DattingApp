import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistorComponent } from './registor/registor.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MessageComponent } from './message/message.component';
import { MatchesComponent } from './matches/matches.component';
import { AuthGuard } from './_gaurd/auth.guard';


const routes: Routes = [
  { path:"home",component:HomeComponent },
  { path:"registor",component:RegistorComponent },
  { path:"member-list",component:MemberListComponent,canActivate:[AuthGuard] },
  { path:"message",component:MessageComponent,canActivate:[AuthGuard] },
  { path:"matches",component:MatchesComponent,canActivate:[AuthGuard]},
  { path:"",redirectTo:"home",pathMatch:"full" },
  { path:"**",redirectTo:"home",pathMatch:"full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
