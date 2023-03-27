import { Router } from '@angular/router';
import { UserLogin } from './../models/userLogin';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl: string = '';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    }),
    strictSSL: false,
  };

  constructor(private http: HttpClient, private Router: Router) {
    this.baseUrl = environment.appUrl + 'api/Token';
  }

  LoginUser(UserLogin: UserLogin) {
    console.log('entro');
    /*Cuando hacen click en el formulario del Login, llaman a esta funcion que se conecta 
  al backend para devolver si funciono o no las credenciales, podemos dejar esto tal cual porque
  lo que importa y para burlar el guardia es desde el componente Login
*/
    return this.http.post(
      this.baseUrl,
      JSON.stringify(UserLogin),
      this.httpOptions
    );
  }

  getToken() {
    console.log('El token es: ' + localStorage.getItem('Token'));
    return localStorage.getItem('Token');
  }
  getUserName() {
    return localStorage.getItem('UserName')?.toUpperCase();
  }
  getRole() {
    return localStorage.getItem('Role')?.toUpperCase();
  }
  getParishId() {
    return localStorage.getItem('ParishId');
  }

  getRoleNav() {
    if (this.getRole() == 'ADMINISTRATOR') {
      return 'ADMINISTRADOR';
    }
    if (this.getRole() == 'PARISHES') {
      return 'PARROQUIA';
    }

    return '';
  }

  loggedIn() {
    return !!localStorage.getItem('Token');
  }

  Administrator() {
    if (this.getRole() == 'ADMINISTRATOR') {
      return true;
    }
    return false;
  }

  Parishes() {
    if (this.getRole() == 'PARISHES') {
      return true;
    }
    return false;
  }

  loggedOut() {
    localStorage.removeItem('Token');
    localStorage.removeItem('UserName');
    localStorage.removeItem('Role');
    localStorage.removeItem('ParishId');
    this.Router.navigate(['/login']);
  }
}
