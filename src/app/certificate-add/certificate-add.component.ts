import { SignatoryService } from './../services/signatory.service';
import { SignatoriesComponent } from './../signatories/signatories.component';
import { ParishService } from './../services/parish.service';
import { Parish } from './../models/parish';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CertificateService } from './../services/certificate.service';
import { Certificate } from './../models/certificate';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-certificate-add',
  templateUrl: './certificate-add.component.html',
  styleUrls: ['./certificate-add.component.css']
})
export class CertificateAddComponent implements OnInit {

  certificate: Certificate = new Certificate();
  parishesList: any;
  optionParish: number=0;
  parish="";
  months = [
    "","Enero", "Febrero", "Marzo",
    "Abril", "Mayo", "Junio", "Julio",
    "Agosto", "Septiembre", "Octubre",
    "Noviembre", "Diciembre"
  ]
  constructor(private CertificateService : CertificateService, private router: Router,
    private SignatoryService: SignatoryService,
    private ParishService: ParishService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.ListParishes();
    this.certificate.Name="";
    this.certificate.SurName="";
    this.certificate.Dad="";
    this.certificate.Mother="";
    this.certificate.GoodParents="";
    this.certificate.Ci="";
    this.certificate.Baptize="";
    this.certificate.Confirming="";
  }

  ListParishes() {
    this.ParishService.getParishesAll().subscribe( response=>
      {
        this.parishesList= response.data;
      }
    )
  }

  saveCertificate(action: any): void {
    this.CertificateService.saveCertificate(this.certificate)
    .subscribe(
      response => {
        this.toastr.success("se guardo exitosamente el nuevo certificado","Guardado.")
        if(action=="continue")
        {
          this.certificate.Name="";
          this.certificate.SurName="";
          this.certificate.Age=0;
          this.certificate.Dad="";
          this.certificate.Mother="";
          this.certificate.GoodParents="";
          this.certificate.Ci="";
          this.certificate.Baptize="";

        }
        if(action=="print"){
          this.printCertificate(response.data);
          this.router.navigate(['/certificate']);
        }
        if(action=="guardar"){
          this.router.navigate(['/certificate']);
        }
      },
      error => {
        this.toastr.warning("no se guardo el certificado","Error.")
      });
  }
  capturer(id: string){
    this.certificate.ParishId = parseInt(id);
  }


  printCertificate(certificate: any){


  this.ParishService.getParish(certificate.parishId).subscribe( resParish=>{
      this.SignatoryService.getSignatorySelect().subscribe(
      responseSignatory=>{

                  var date = new Date();
                  var DateString = date.getDate() + ' de ' + this.months[date.getMonth()+1] + ' de ' + date.getFullYear();


                  var DateConfirmation =certificate.dateConfirmation.substr(8,2)
                                        + ' de ' + this.months[Number(certificate.dateConfirmation.substr(5,2))]
                                        + ' de ' + certificate.dateConfirmation.substr(0,4);


                  var cuerpo=

                  "<style type='text/css'>"+
                  ".tab { border-style: solid; border-top-width: 4px; border-right-width: 4px; border-bottom-width: 0px; border-left-width: 4px}"+
                  ".tabM{ border-style: solid; border-top-width: 1px; border-right-width: 4px; border-bottom-width: 0px;  border-left-width: 4px}"+
                  ".tabF{ border-style: solid; border-top-width: 0px; border-right-width: 4px; border-bottom-width: 4px;  border-left-width: 4px}"+
                  "br{ border-style: solid; border-top-width: 10px; border-right-width: 1px; border-bottom-width: 1px;  border-left-width: 1px}"+
                  "td{  padding: 6px;}"+
                  "</style>"+
                  "<br><br><br><br><br><br><br><br><br>"+
                  "<div style='padding: 0px 0px 0px 60px;'>"+
                  "<table class='tab' style='width:90%;height:auto' BORDER=0 cellspacing='0' cellpadding='0'>"+
                  "<thead> <tr style='text-align: center;' > <th><h1>CERTIFICADO DE CONFIRMACION</h1></th> </tr><thead>"+
                  "</table>"+
                  "<table class='tab' width='90%' BORDER=0 cellspacing='0' cellpadding='0'>"+
                      "<tr style='text-align: center;'>"+
                          "<td style='font-weight: bold;'>LIBRO N° "+certificate.numberBook+"</td>"+
                          "<td style='font-weight: bold;'>PAGINA N° "+certificate.numberPage+"</td>"+
                          "<td style='font-weight: bold;'>FOLIO N° "+certificate.numberInvoice+"</td>"+
                      "</tr>"+
                  "</table>"+
                  "<table style='width:90%;height:auto' class='tabM'  BORDER=0 cellspacing='0' cellpadding='0'>"+
                    "<tr>"+
                        "<td></td>"+
                    "</tr>"+
                    "<tr>"+
                        "<td NOWRAP style='font-weight: bold;'>&nbsp;&nbsp;&nbsp;NOMBRES : </td>"+
                        "<td>" +certificate.name?.toUpperCase()+" </td>"+
                    "</tr>"+
                    "<tr>"+
                        "<td NOWRAP style='font-weight: bold;'> &nbsp;&nbsp;&nbsp;APELLIDOS :</td>"+
                        "<td> "+certificate.surName?.toUpperCase()+" </td>"+
                    "</tr>"+
                    "<tr>"+
                        "<td  NOWRAP style='font-weight: bold;'>  &nbsp;&nbsp;&nbsp;EDAD :</td>"+
                        "<td> "+certificate.age+" AÑOS </td>"+
                    "</tr>"+
                    "<tr>"+
                        "<td NOWRAP style='font-weight: bold;'>  &nbsp;&nbsp;&nbsp;PADRE :</td>"+
                        "<td> "+certificate.dad?.toUpperCase()+"</td>"+
                    "</tr>"+
                    "<tr>"+
                        "<td NOWRAP style='font-weight: bold;'> &nbsp;&nbsp;&nbsp;MADRE :</td>"+
                        "<td>"+certificate.mother?.toUpperCase()+"</td>"+
                    "</tr>"+
                    "<tr>"+
                        "<td NOWRAP style='text-align: initial; font-weight: bold;'>  &nbsp;&nbsp;&nbsp;PADRINOS :</td>"+
                        "<td> "+certificate.goodParents?.toUpperCase()+" </td>"+
                    "</tr>"+
                  "</table>"+
                  "<table style='width:90%;height:auto'   class='tabF'  BORDER=0 cellspacing='0' cellpadding='0'> "+
                  "<tr>"+
                      "<td NOWRAP style='font-weight: bold; '>&nbsp;&nbsp;&nbsp;PARROQUIA DE BAUTISMO : </td>"+
                      "<td>"+certificate.baptize?.toUpperCase()+" </td>"+
                  "</tr>"+
                  "<tr>"+
                      "<td NOWRAP style='font-weight: bold; '>&nbsp;&nbsp;&nbsp;FECHA DE CONFIRMACIÓN : </td>"+
                      "<td>"+DateConfirmation?.toUpperCase()+" </td>"+
                  "</tr>"+
                  "<tr>"+
                      "<td NOWRAP style='font-weight: bold;'>&nbsp;&nbsp;&nbsp;PARROQUIA DE CONFIRMACIÓN :</td>"+
                      "<td>"+resParish.data.name.toUpperCase()+"</td>"+
                  "</tr>"+
                  "<tr>"+
                      "<td NOWRAP style='font-weight: bold;'>&nbsp;&nbsp;&nbsp;MINISTRO CONFIRMANTE :</td>"+
                      "<td>"+certificate.confirming?.toUpperCase()+"</td>"+
                  "</tr>"+
                  "<tr>"+
                      "<td colspan='2'> <br></td>"+
                  "</tr>"+
                  "<tr>"+
                      "<td colspan='2'>  &nbsp;&nbsp;&nbsp;Es copia fiel del libro de CONFIRMACIONES del obispado de Tarija.</td>"+
                  "</tr>"+
                  "<tr>"+
                      "<td colspan='2'> <br><br></td>"+
                  "</tr>"+
                  "<tr>"+
                  "<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sello</td>"+
                 "</tr>"+
                  "<tr>"+
                     "<td colspan='2' NOWRAP style='text-align: right;'>"+ responseSignatory.data.name?.toUpperCase()+" "+responseSignatory.data.surName?.toUpperCase() +"</td>"+
                  "</tr>"+
                  "<tr>"+
                      "<td colspan='2' style='text-align: right; font-weight: bold;'>"+responseSignatory.data.position?.toUpperCase() +"&nbsp;&nbsp;</td>"+
                  "</tr>"+
                  "<tr>"+
                  "<td colspan='2' style='text-align: start;'> &nbsp;&nbsp; "+DateString+"</td>"+
                  "</tr>"+
                  "<tr>"+
                  "<td colspan='2'> <br></td>"+
                  "</tr>"+

              "</table></div>";

              var ventana = window.open();
              ventana?.document.write(cuerpo);
              ventana?.document.close();
              ventana?.focus();
              ventana?.print();
              ventana?.close();

              }
              )
            }
          )
        }

}
