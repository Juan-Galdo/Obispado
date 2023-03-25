import { Router } from '@angular/router';
import { CertificateService } from './../services/certificate.service';
import { ParishService } from './../services/parish.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Certificate } from '../models/certificate';

@Component({
  selector: 'app-certificate-parish-add',
  templateUrl: './certificate-parish-add.component.html',
  styleUrls: ['./certificate-parish-add.component.css']
})
export class CertificateParishAddComponent implements OnInit {
  certificate: Certificate = new Certificate();
  parishesList: any;

  constructor(private CertificateService : CertificateService, private router: Router,
    private ParishService: ParishService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.certificate.Name="";
    this.certificate.SurName="";
    this.certificate.Dad="";
    this.certificate.Mother="";
    this.certificate.GoodParents="";
    this.certificate.Ci="";
    this.certificate.Baptize="";
  }


  saveCertificate(action: any): void {

    this.certificate.ParishId=Number(localStorage.getItem('ParishId'));

    this.CertificateService.saveCertificatePending(this.certificate)
    .subscribe(
      response => {
        this.toastr.success("se guardo exitosamente el nuevo certificado","Guardado.")
        if(action=="continue")
        {
          this.certificate.Name="";
          this.certificate.SurName="";
          this.certificate.Dad="";
          this.certificate.Mother="";
          this.certificate.GoodParents="";
          this.certificate.Ci="";
          this.certificate.Baptize="";
        }
        else{
          this.router.navigate(['/certificateParish']);
        }


      },
      error => {
        this.toastr.warning("no se guardo el certificado","Error.")
      });
  }

}
