import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/Auth.service';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model:any={};

  constructor(private authService:AuthService,
              private alertifyService:AlertifyService) { }

  ngOnInit() {
  }

  Login(){
    this.authService.Login(this.model).subscribe(res=>{
      this.alertifyService.success("login successful.");
    },error=>{
      this.alertifyService.error(error);
    },()=>{
      console.log("Complet");
    })
  }

  IsLogedIn(){
    const token = localStorage.getItem("token");
    return !!token;
  }

  Logout(){
    localStorage.clear();
    this.alertifyService.success("logout successful.");
  }

}
