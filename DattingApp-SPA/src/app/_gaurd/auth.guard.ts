import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/Auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private alertifyService:AlertifyService,
              private authService:AuthService,
              private router:Router)
  {}
  canActivate(): boolean {
    if(this.authService.IsLogedIn()){
      return true;
    }

    this.alertifyService.error("Sorry please login.");
    this.router.navigate(["home"]);
  }
  
}
