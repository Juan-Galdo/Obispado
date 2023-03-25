import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginService } from './../services/login.service';
import { UserLogin } from './../models/userLogin';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  UserLogin = new UserLogin();
  load: boolean = true;
  constructor(
    private LoginService: LoginService,
    private Router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  /***** ESTE FRAGMENTO DEL CODIGO ES EL ORIGINAL, SOLO QUE ESTA EXPLICADO, LE CAMBIE EL NOMBRE A LoginOriginal, nomas lo vuelven 
       a cambiar por Login y borran el otro que esta editado *****/
  // Esta es la funcion Login cuando presionan el boton "login", mejor pongan "Iniciar Sesion" xD
  Login(): void {
    // Este Load es para mostar el signo cuando carga, el redondito
    this.load = false;
    // Aqui es lo que les menciono en el Login Service, al presionar en Login procede a ejecutar lo siguiente
    // Estos son los datos que recopilamos del formulario para mandar al backend y confirmar las credenciales
    const data = {
      Password: this.UserLogin.Password,
      User: this.UserLogin.User,
    };
    // Aca se carga la variable "data", en la que estan el nombre y contraseña, para confirmar las credenciales
    console.log(data);
    this.LoginService.LoginUser(data).subscribe(
      (response) => {
        /**Luego de que este se comunica al backend y las credenciales son correctas, nos devuelve los siguiente valores */
        localStorage.setItem('Token', (response as any).token);
        localStorage.setItem('UserName', (response as any).userName);
        localStorage.setItem('Role', (response as any).role);
        localStorage.setItem('ParishId', (response as any).parishId);
        this.load = true;
        this.toastr.success('Logeado exitosamente.');
        /**Nos dirige a la pantalla de HOME, que es la misma que ven al principio antes de hacer Login xDDD */
        this.Router.navigate(['/home']);
      },
      (error) => {
        this.load = true;
        this.toastr.warning(
          'Porfavor verifique los datos ingresados en password y gmail',
          'Error de login.'
        );
      }
    );
  }

  /***** ESTE FRAGMENTO DEL CODIGO ES EL EDITADO PARA QUE PUEDAN INTERACTUAR SIN GUARDIA, NI RESTRICCIONES, SOLO DIRIGE AL HOME*****/
  // Login(): void {
  //       this.Router.navigate(['/home']);
  //     }
}
