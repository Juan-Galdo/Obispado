import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from './services/login.service';
import { Inject, Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private injector: Injector,
    private LoginService: LoginService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  intercept(req: any, next: any) {
    let authService = this.injector.get(LoginService);

    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
    });

    return next.handle(tokenizedReq).pipe(
      catchError((error) => {
        if (error.status == 401) {
          this.toastr.warning(
            'Por seguridad el tiempo de autorizacion acabo',
            'Expiro su autorizacion.'
          );
          this.LoginService.loggedOut();
        }
        if (error.status == 403) {
          this.toastr.error(
            'No esta autorizado para ingresar.',
            'No Autorizado.'
          );
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }
}
