import { TutorialComponent } from './tutorial/tutorial.component';
import { PlanillaComponent } from './planilla/planilla.component';
import { CertificatePrintComponent } from './certificate-print/certificate-print.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { UsersAddComponent } from './users-add/users-add.component';
import { UsersComponent } from './users/users.component';
import { CertificatePendingComponent } from './certificate-pending/certificate-pending.component';
import { HomeComponent } from './home/home.component';
import { CertificateEditComponent } from './certificate-edit/certificate-edit.component';
import { CertificateAddComponent } from './certificate-add/certificate-add.component';
import { SignatoryEditComponent } from './signatory-edit/signatory-edit.component';
import { CertificateComponent } from './certificate/certificate.component';
import { SignatoryAddComponent } from './signatory-add/signatory-add.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParishesComponent } from './parishes/parishes.component';
import { ParishAddeditComponent } from './parish-addedit/parish-addedit.component';
import { SignatoriesComponent } from './signatories/signatories.component';
import { ParishEditComponent } from './parish-edit/parish-edit.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { CertificateParishComponent } from './certificate-parish/certificate-parish.component';
import { CertificateParishAddComponent } from './certificate-parish-add/certificate-parish-add.component';
import { MenuNavComponent } from './menu-nav/menu-nav.component';

const routes: Routes = [
  /*** Se silencio estas rutas donde el Guardia impide que se acceda */
  { path: 'parish', component: ParishesComponent, canActivate: [AuthGuard] },
  {
    path: 'parish/:Id',
    component: ParishEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'addParish',
    component: ParishAddeditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'signatory',
    component: SignatoriesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'signatory/:Id',
    component: SignatoryEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'addSignatory',
    component: SignatoryAddComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'certificate',
    component: CertificateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'certificate/:Id/:Name',
    component: CertificateEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'addcertificate',
    component: CertificateAddComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'certificatePending',
    component: CertificatePendingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'certificateParish',
    component: CertificateParishComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'addcertificateParish',
    component: CertificateParishAddComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'certificatePrint',
    component: CertificatePrintComponent,
    canActivate: [AuthGuard],
  },
  { path: 'user', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'addUser', component: UsersAddComponent, canActivate: [AuthGuard] },
  { path: 'user/:Id', component: UsersEditComponent, canActivate: [AuthGuard] },
  { path: 'planilla', component: PlanillaComponent, canActivate: [AuthGuard] },
  { path: 'tutorial', component: TutorialComponent, canActivate: [AuthGuard] },
  /* { path: 'login', component: LoginComponent }, */
  { path: '**', component: LoginComponent },

  /**** Estas rutas estan sin Guardias para hacer las pruebas, borrenlas cuando terminen los diseños para que vuelvan a usar el Login  */
  /*  {path: 'parish', component: ParishesComponent},
  {path: 'parish/:Id', component: ParishEditComponent},
  {path: 'addParish', component: ParishAddeditComponent},
  {path: 'signatory', component: SignatoriesComponent},
  {path: 'signatory/:Id', component: SignatoryEditComponent},
  {path: 'addSignatory', component: SignatoryAddComponent},
  {path: 'certificate', component: CertificateComponent},
  {path: 'certificate/:Id/:Name', component: CertificateEditComponent},
  {path: 'addcertificate', component: CertificateAddComponent},
  {path: 'certificatePending', component: CertificatePendingComponent},
  {path: 'certificateParish', component: CertificateParishComponent},
  {path: 'addcertificateParish', component: CertificateParishAddComponent},
  {path: 'certificatePrint', component: CertificatePrintComponent},
  {path: 'user', component: UsersComponent},
  {path: 'addUser', component: UsersAddComponent},
  {path: 'user/:Id', component: UsersEditComponent},
  {path: 'planilla', component: PlanillaComponent},
  {path: 'tutorial', component: TutorialComponent},
  {path: 'login' , component: LoginComponent},
  {path: '**' , component: HomeComponent} */
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
