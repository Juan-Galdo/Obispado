import { UserService } from './services/user.service';
import { CertificateService } from './services/certificate.service';
import { Certificate } from './models/certificate';
import { LoginService } from './services/login.service';
import { SignatoryService } from './services/signatory.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ParishesComponent } from './parishes/parishes.component';
import { ParishAddeditComponent } from './parish-addedit/parish-addedit.component';
import { SignatoriesComponent } from './signatories/signatories.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ParishService } from './services/parish.service';
import { SignatoryAddComponent } from './signatory-add/signatory-add.component';
import { CertificateComponent } from './certificate/certificate.component';
import { ParishEditComponent } from './parish-edit/parish-edit.component';
import { SignatoryEditComponent } from './signatory-edit/signatory-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CertificateAddComponent } from './certificate-add/certificate-add.component';
import { CertificateEditComponent } from './certificate-edit/certificate-edit.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptor } from './token.interceptor';
import { HomeComponent } from './home/home.component';
import { CertificateParishComponent } from './certificate-parish/certificate-parish.component';
import { CertificateParishAddComponent } from './certificate-parish-add/certificate-parish-add.component';
import { CertificatePendingComponent } from './certificate-pending/certificate-pending.component';
import { UsersComponent } from './users/users.component';
import { UsersAddComponent } from './users-add/users-add.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { CertificatePrintComponent } from './certificate-print/certificate-print.component';
import { PlanillaComponent } from './planilla/planilla.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { MaterialCollectionModule } from './material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MenuNavComponent } from './menu-nav/menu-nav.component';
@NgModule({
  declarations: [
    AppComponent,
    ParishesComponent,
    ParishAddeditComponent,
    SignatoriesComponent,
    SignatoryAddComponent,
    CertificateComponent,
    ParishEditComponent,
    SignatoryEditComponent,
    CertificateAddComponent,
    CertificateEditComponent,
    LoginComponent,
    HomeComponent,
    CertificateParishComponent,
    CertificateParishAddComponent,
    CertificatePendingComponent,
    UsersComponent,
    UsersAddComponent,
    UsersEditComponent,
    CertificatePrintComponent,
    PlanillaComponent,
    TutorialComponent,
    MenuNavComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialCollectionModule,
    FormsModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    ToastrModule.forRoot()
  ],
  providers: [

    LoginService,
    UserService,
    AuthGuard, {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}

