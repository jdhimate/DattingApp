import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistorComponent } from './registor/registor.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path:"home",component:HomeComponent },
  { path:"registor",component:RegistorComponent },
  { path:"",redirectTo:"home",pathMatch:"full" },
  { path:"**",redirectTo:"home",pathMatch:"full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
