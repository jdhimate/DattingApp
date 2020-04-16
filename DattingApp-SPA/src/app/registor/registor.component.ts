import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/Auth.service';

@Component({
  selector: 'app-registor',
  templateUrl: './registor.component.html',
  styleUrls: ['./registor.component.css']
})
export class RegistorComponent implements OnInit {

  model:any={};

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  Registor(){
    this.authService.Registor(this.model).subscribe(res=>{
      console.log("success");
    },error=>{
      console.log(error);
    },()=>{
      console.log("complet");
    })
  }

}
