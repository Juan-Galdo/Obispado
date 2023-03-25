import { SignatoryService } from './../services/signatory.service';
import { ParishService } from './../services/parish.service';
import { CertificateService } from './../services/certificate.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Certificate } from '../models/certificate';

@Component({
  selector: 'app-certificate-edit',
  templateUrl: './certificate-edit.component.html',
  styleUrls: ['./certificate-edit.component.css']
})
export class CertificateEditComponent implements OnInit {

  certificate : Certificate = new Certificate ();
  optionParish: number=0;
  parishPrint='';
  parishesList: any;
  fecha:any;
  months = [
    "","Enero", "Febrero", "Marzo",
    "Abril", "Mayo", "Junio", "Julio",
    "Agosto", "Septiembre", "Octubre",
    "Noviembre", "Diciembre"
  ]

  constructor(private CertificateService : CertificateService,
    private Router: Router ,
    private Route : ActivatedRoute,
    private toastr: ToastrService,
    private ParishService: ParishService,
    private SignatoryService: SignatoryService) { }

  ngOnInit(): void {

    this.ParishService.getParishesAll().subscribe( response=>
      {
        this.parishesList= response.data;
      }
    )

    this.getCertificate(this.Route.snapshot.params.Id);

  }

  getCertificate(Id: number) {
    this.CertificateService.getCertificate(Id)
      .subscribe(
        data => {
          this.fecha=data.data.dateConfirmation.substring(0,10);
          this.certificate.Name = data.data.name;
          this.certificate.SurName = data.data.surName;
          this.certificate.Age = data.data.age;
          this.certificate.Id = data.data.id;
          this.certificate.Dad = data.data.dad;
          this.certificate.Mother = data.data.mother;
          this.certificate.Name = data.data.name;
          this.certificate.DateConfirmation = this.fecha;
          this.certificate.GoodParents = data.data.goodParents;
          this.certificate.Confirming = data.data.confirming;
          this.certificate.NumberBook = data.data.numberBook;
          this.certificate.NumberPage = data.data.numberPage;
          this.certificate.Printed = data.data.printed;
          this.certificate.NumberInvoice = data.data.numberInvoice;
          this.certificate.Ci = data.data.ci;
          this.certificate.ParishId = data.data.parishId;
          this.certificate.Id= Id;
          this.certificate.Verified=  data.data.verified;
          this.certificate.Printed=  data.data.printed;
          this.certificate.Baptize= data.data.baptize;
          this.optionParish = data.data.parishId
        })
  }


  update(option: string): void {
    if(this.Route.snapshot.params.Name=="pending")
    {
      this.certificate.Verified=true;
    }
    this.certificate.DateConfirmation=this.fecha;
    this.CertificateService.updateCertificate(this.certificate)
    .subscribe(
      response => {
        if(this.Route.snapshot.params.Name=="pending"){
          this.Router.navigate(['/certificatePending']);
        }
        else
        {
          if(option=="print")
          {
            this.printCertificate();
          }
          this.Router.navigate(['/certificate']);
        }
        this.toastr.success("se actualizo la informacion del certificado seleccionada","Certificado Editado.")
      },
      error => {
        this.toastr.warning("no se actualizo la informacion del certificado","Error.")
      });
  }


  capturer(id: string){
    this.certificate.ParishId = parseInt(id);
  }

  pendingList()
  {
    if(this.Route.snapshot.params.Name=="pending")
    {
      return true;
    }
    else
    {
      return false;
    }
  }


  printCertificate(){

    this.ParishService.getParish(this.optionParish).subscribe(
      res=>{
        this.parishPrint=String(res.data.name);
      }
    );

    this.SignatoryService.getSignatorySelect().subscribe(
      responseSignatory=>{

                  var date = new Date();
                  var DateString = date.getDate() + ' de ' + this.months[date.getMonth()+1] + ' de ' + date.getFullYear();



                  var DateConfirmation =this.fecha.substr(8,2)
                                        + ' de ' + this.months[Number(this.fecha.substr(5,2))]
                                        + ' de ' + this.fecha.substr(0,4);


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
                          "<td style='font-weight: bold;'>LIBRO N° "+ this.certificate.NumberBook+"</td>"+
                          "<td style='font-weight: bold;'>PAGINA N° "+this.certificate.NumberPage+"</td>"+
                          "<td style='font-weight: bold;'>FOLIO N° "+this.certificate.NumberInvoice+"</td>"+
                      "</tr>"+
                  "</table>"+
                  "<table style='width:90%;height:auto' class='tabM'  BORDER=0 cellspacing='0' cellpadding='0'>"+
                    "<tr>"+
                        "<td></td>"+
                    "</tr>"+
                    "<tr>"+
                        "<td NOWRAP style='font-weight: bold;'>&nbsp;&nbsp;&nbsp;NOMBRES : </td>"+
                        "<td>" +this.certificate.Name?.toUpperCase()+" </td>"+
                    "</tr>"+
                    "<tr>"+
                        "<td NOWRAP style='font-weight: bold;'> &nbsp;&nbsp;&nbsp;APELLIDOS :</td>"+
                        "<td> "+this.certificate.SurName?.toUpperCase()+" </td>"+
                    "</tr>"+
                    "<tr>"+
                        "<td  NOWRAP style='font-weight: bold;'>  &nbsp;&nbsp;&nbsp;EDAD :</td>"+
                        "<td> "+this.certificate.Age+" AÑOS </td>"+
                    "</tr>"+
                    "<tr>"+
                        "<td NOWRAP style='font-weight: bold;'>  &nbsp;&nbsp;&nbsp;PADRE :</td>"+
                        "<td> "+this.certificate.Dad?.toUpperCase()+"</td>"+
                    "</tr>"+
                    "<tr>"+
                        "<td NOWRAP style='font-weight: bold;'> &nbsp;&nbsp;&nbsp;MADRE :</td>"+
                        "<td>"+this.certificate.Mother?.toUpperCase()+"</td>"+
                    "</tr>"+
                    "<tr>"+
                        "<td NOWRAP style='text-align: initial; font-weight: bold;'>  &nbsp;&nbsp;&nbsp;PADRINOS :</td>"+
                        "<td> "+this.certificate.GoodParents?.toUpperCase()+" </td>"+
                    "</tr>"+
                  "</table>"+
                  "<table style='width:90%;height:auto'   class='tabF'  BORDER=0 cellspacing='0' cellpadding='0'> "+
                  "<tr>"+
                      "<td NOWRAP style='font-weight: bold; '>&nbsp;&nbsp;&nbsp;PARROQUIA DE BAUTISMO : </td>"+
                      "<td>"+this.certificate.Baptize?.toUpperCase()+" </td>"+
                  "</tr>"+
                  "<tr>"+
                      "<td NOWRAP style='font-weight: bold; '>&nbsp;&nbsp;&nbsp;FECHA DE CONFIRMACIÓN : </td>"+
                      "<td>"+DateConfirmation.toUpperCase()+" </td>"+
                  "</tr>"+
                  "<tr>"+
                      "<td NOWRAP style='font-weight: bold;'>&nbsp;&nbsp;&nbsp;PARROQUIA DE CONFIRMACIÓN :</td>"+
                      "<td>"+this.parishPrint.toUpperCase()+"</td>"+
                  "</tr>"+
                  "<tr>"+
                      "<td NOWRAP style='font-weight: bold;'>&nbsp;&nbsp;&nbsp;MINISTRO CONFIRMANTE :</td>"+
                      "<td>"+this.certificate.Confirming?.toUpperCase()+"</td>"+
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
                     "<td colspan='2' NOWRAP style='text-align: right;'>"+ responseSignatory.data.name.toUpperCase()+" "+responseSignatory.data.surName.toUpperCase() +"</td>"+
                  "</tr>"+
                  "<tr>"+
                      "<td colspan='2' style='text-align: right; font-weight: bold;'>"+responseSignatory.data.position.toUpperCase() +"&nbsp;&nbsp;</td>"+
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


}
