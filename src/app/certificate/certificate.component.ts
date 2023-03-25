import { Certificate } from './../models/certificate';
import { SignatoryService } from './../services/signatory.service';
import { MetaData } from './../models/metaData';
import { PaginationService } from './../services/pagination.service';
import { ToastrService } from 'ngx-toastr';
import { ParishService } from './../services/parish.service';
import { CertificateService } from './../services/certificate.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent implements OnInit {

  load: boolean= false;
  find='';
  parishesList: any;
  certificateList:any;
  list:string[]=["5","15","30","50"];
  metaData : MetaData =  new MetaData();
  months = [
    "","Enero", "Febrero", "Marzo",
    "Abril", "Mayo", "Junio", "Julio",
    "Agosto", "Septiembre", "Octubre",
    "Noviembre", "Diciembre"
  ]
  optionSelect:string="5";

  constructor(private CertificateService: CertificateService,
                private ParishService:ParishService,
                private toastr: ToastrService,
                private PaginationService: PaginationService,
                private SignatoryService: SignatoryService) { }


  ngOnInit(): void {
    this.PaginationService.filterData.filter='';
    this.PaginationService.filterData.PageSize=5;
    this.PaginationService.filterData.PageNumber=1;
    this.ListCertificates();
  }

  ListCertificates() {
   this.load=false;

   this.CertificateService.getCertificates().subscribe( response=>
      {
        this.metaData= response.meta;
        this.certificateList= response.data;

        this.metaData.TotalPages= response.meta.totalPages;
        this.metaData.CurrentPage= response.meta.currentPage;
        this.metaData.HasNextPage = response.meta.hasNextPage;
        this.metaData.HasPreviousPage = response.meta.hasPreviousPage;

        for (let i = 0; i <  this.certificateList.length; i++) {
          this.ParishService.getParish(this.certificateList[i].parishId).
          subscribe(
              res=>{
                  this.certificateList[i].ParishName=res.data.name;
              }
          )
        }
        this.load=true;
      }
    )

  }

  delete(certificateId: any){
    const res = confirm('Seguro que desea el certificado');
    if (res){
        this.CertificateService.deleteCertificate(certificateId).subscribe((data) => {
          this.ListCertificates();
          this.toastr.success("se elimino el certificado selccionada","Certificado Eliminado.")
        });
    }
  }


  Find() {
    this.PaginationService.filterData.PageNumber=1;
    this.PaginationService.Find(this.find);
    this.ListCertificates();
  }

  Quantity(PageSize: any) {
    this.PaginationService.Quantity(Number(PageSize.target.value));
    this.optionSelect= (PageSize.target.value);
    this.ListCertificates();
  }

  Preview(){
    this.PaginationService.Preview();
    this.ListCertificates();
  }

  Next(){
    this.PaginationService.Next();
    this.ListCertificates();
  }


  printCertificate(certificate: any){

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
                        "<td>" +certificate.name.toUpperCase()+" </td>"+
                    "</tr>"+
                    "<tr>"+
                        "<td NOWRAP style='font-weight: bold;'> &nbsp;&nbsp;&nbsp;APELLIDOS :</td>"+
                        "<td> "+certificate.surName.toUpperCase()+" </td>"+
                    "</tr>"+
                    "<tr>"+
                        "<td  NOWRAP style='font-weight: bold;'>  &nbsp;&nbsp;&nbsp;EDAD :</td>"+
                        "<td> "+certificate.age+" AÑOS </td>"+
                    "</tr>"+
                    "<tr>"+
                        "<td NOWRAP style='font-weight: bold;'>  &nbsp;&nbsp;&nbsp;PADRE :</td>"+
                        "<td> "+certificate.dad.toUpperCase()+"</td>"+
                    "</tr>"+
                    "<tr>"+
                        "<td NOWRAP style='font-weight: bold;'> &nbsp;&nbsp;&nbsp;MADRE :</td>"+
                        "<td>"+certificate.mother.toUpperCase()+"</td>"+
                    "</tr>"+
                    "<tr>"+
                        "<td NOWRAP style='text-align: initial; font-weight: bold;'>  &nbsp;&nbsp;&nbsp;PADRINOS :</td>"+
                        "<td> "+certificate.goodParents.toUpperCase()+" </td>"+
                    "</tr>"+
                  "</table>"+
                  "<table style='width:90%;height:auto'   class='tabF'  BORDER=0 cellspacing='0' cellpadding='0'> "+
                  "<tr>"+
                      "<td NOWRAP style='font-weight: bold; '>&nbsp;&nbsp;&nbsp;PARROQUIA DE BAUTISMO : </td>"+
                      "<td>"+certificate.baptize?.toUpperCase()+" </td>"+
                  "</tr>"+
                  "<tr>"+
                      "<td NOWRAP style='font-weight: bold; '>&nbsp;&nbsp;&nbsp;FECHA DE CONFIRMACIÓN : </td>"+
                      "<td>"+DateConfirmation.toUpperCase()+" </td>"+
                  "</tr>"+
                  "<tr>"+
                      "<td NOWRAP style='font-weight: bold;'>&nbsp;&nbsp;&nbsp;PARROQUIA DE CONFIRMACIÓN :</td>"+
                      "<td>"+certificate.ParishName.toUpperCase()+"</td>"+
                  "</tr>"+
                  "<tr>"+
                      "<td NOWRAP style='font-weight: bold;'>&nbsp;&nbsp;&nbsp;MINISTRO CONFIRMANTE :</td>"+
                      "<td>"+certificate.confirming.toUpperCase()+"</td>"+
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
