import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-Value',
  templateUrl: './Value.component.html',
  styleUrls: ['./Value.component.css']
})
export class ValueComponent implements OnInit {

  public values:any;

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.GetValues()
  }

  GetValues(){
    this.http.get("http://localhost:4202/api/Values").subscribe(res=>{
      this.values=res;
    },error=>{
      console.log(error);
    });
  }

}
