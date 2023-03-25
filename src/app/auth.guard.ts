import { LoginService } from './services/login.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: LoginService, private _router: Router){}
  canActivate(): boolean{

/**Aqui se condiciona si el usuario ha iniciado sesion, de haber sido asi podra 
   navegar entre las paginas, aunque depende de su Rol tambien
*/
    if (this._authService.loggedIn()){
      return true;
    }
/*Si no inicio sesion y no cumple roles, sera expulsado al Login obligotariamente 
*/
    else{
        this._router.navigate(['/login']);
        return false;
    }
  }


}
