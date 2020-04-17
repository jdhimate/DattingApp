import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/Auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model:any={};

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  Login(){
    this.authService.Login(this.model).subscribe(res=>{
      console.log("Success");
    },error=>{
      console.log(error);
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
  }

}
