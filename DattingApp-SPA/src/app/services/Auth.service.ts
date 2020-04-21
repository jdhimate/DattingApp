import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = "http://localhost:4202/api/auth/"

  constructor(private http: HttpClient) { }

  public Login(model): Observable<any> {
    return this.http.post(this.baseUrl + "login", model).pipe(
      map((res: any) => {
        if (res)
          localStorage.setItem("token", res.token);
      })
    );
  }

  public Registor(model): Observable<any> {
    return this.http.post(this.baseUrl + "registor", model);
  }

  IsLogedIn(){
    const token = localStorage.getItem("token");
    return !!token;
  }
}
