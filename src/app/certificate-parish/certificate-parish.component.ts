import { CertificatePrint } from './../models/certificatePrint';
import { element } from 'protractor';
import { SignatoryService } from './../services/signatory.service';
import { PaginationService } from './../services/pagination.service';
import { ToastrService } from 'ngx-toastr';
import { ParishService } from './../services/parish.service';
import { CertificateService } from './../services/certificate.service';
import { Component, OnInit } from '@angular/core';
import { Certificate } from '../models/certificate';
import { MetaData } from '../models/metaData';

@Component({
  selector: 'app-certificate-parish',
  templateUrl: './certificate-parish.component.html',
  styleUrls: ['./certificate-parish.component.css']
})
export class CertificateParishComponent implements OnInit {
  load: boolean= false;
  certificateList:CertificatePrint[] = [];
  list:string[]=["100","50","30","15"];
  metaData : MetaData =  new MetaData();
  parish: string = '';
  find='';
  optionSelect:string="100";

  months = [
    "","Enero", "Febrero", "Marzo",
    "Abril", "Mayo", "Junio", "Julio",
    "Agosto", "Septiembre", "Octubre",
    "Noviembre", "Diciembre"
  ]


  constructor(private CertificateService: CertificateService,
    private ParishService:ParishService,
    private toastr: ToastrService,
    private PaginationService: PaginationService,
    private SignatoryService: SignatoryService) { }


  ngOnInit(): void {
    this.PaginationService.filterData.filter='';
    this.PaginationService.filterData.PageSize=100;
    this.PaginationService.filterData.PageNumber=1;
    this.ListCertificates();
  }

  ListCertificates() {
  this.load=false;
  this.CertificateService.getCertificateParish(Number(localStorage.getItem('ParishId'))).subscribe( response=>
       {
         this.certificateList= response.data;
         this.metaData= response.meta;

         this.metaData.TotalPages= response.meta.totalPages;
         this.metaData.CurrentPage= response.meta.currentPage;
         this.metaData.HasNextPage = response.meta.hasNextPage;
         this.metaData.HasPreviousPage = response.meta.hasPreviousPage;

         this.ParishService.getParish(Number(localStorage.getItem('ParishId'))).
         subscribe(
             res=>{
                 this.parish=res.data.name;
             }
         )
               this.load=true;

       }
     )

   }



   printCertificates(){
    var print="";
    let cont=0;

    this.certificateList.forEach((element) => {
    cont++;

    var cabecera="<div style='padding: 0px 0px 0px 20px; break-after: page'>";

    var cuerpo= (
        "<table style='width:100%;height:auto' BORDER=2>"+
        "<tr>"+
        "<th align='center'><FONT FACE='Candara' SIZE='7'> Diócesis de Tarija</FONT></th>"+
        "</tr>"+
        "<tr>"+
                    "<td align='center'>&nbsp;&nbsp;&nbsp;Libro Nº &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
                    "&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Pagina Nº &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
                    "&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Folio Nº </td>"+
        "</tr>"+
        "<tr>"+
            "<td>"+
                "<br>&nbsp;&nbsp;&nbsp; <strong>NOMBRES:</strong> &nbsp;"+element.name?.toUpperCase()+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; EDAD:&nbsp;"+element.age+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; CI:&nbsp;"+element.ci+
                "<br>&nbsp;&nbsp;&nbsp; <strong>APELLIDOS:</strong> &nbsp;"+element.surName?.toUpperCase()+
                "<br>&nbsp;&nbsp;&nbsp; <strong>PADRE:</strong> &nbsp;"+element.dad?.toUpperCase()+
                "<br>&nbsp;&nbsp;&nbsp; <strong>MADRE:</strong> &nbsp;"+element.mother?.toUpperCase()+
                "<br>&nbsp;&nbsp;&nbsp; <strong>PADRINOS:</strong> &nbsp;"+element.goodParents?.toUpperCase()+
                "<br>&nbsp;&nbsp;&nbsp; <strong>LUGAR DE BAUTISMO:</strong> &nbsp;"+element.baptize?.toUpperCase()+
                "<br>&nbsp;&nbsp;&nbsp; <strong>LUGAR DE CONFIRMACIÓN:</strong> &nbsp;"+this.parish?.toUpperCase()+
                "<br>&nbsp;&nbsp;&nbsp; <strong>FECHA DE CONFIRMACIÓN:</strong> &nbsp;"+element.dateConfirmation?.toString().substr(0,10)+
                "<br>&nbsp;&nbsp;&nbsp; <strong>MINISTRO CONFIRMANTE:</strong> &nbsp;"+element.confirming?.toUpperCase()+"<br><br>"+
             "</td>"+
        "</tr>"+
      "</table>");

    var final="</div>";


    if(cont==1)
    {
      print=print+cabecera+cuerpo;
    }
    if(cont==2)
    {
      print=print+cuerpo;
    }
    if(cont==3)
    {
      print=print+cuerpo+final;
      cont=0;
    }

    });

        var ventana = window.open('');
        ventana?.document.write(print);
        ventana?.document.close();
        ventana?.focus();
        ventana?.print();
        if(ventana?.print)
        {

         for (let i = 0; i <  this.certificateList.length; i++) {
          let certificate = new Certificate;
          certificate.Id=this.certificateList[i].id;
          certificate.Name=this.certificateList[i].name;
          certificate.SurName=this.certificateList[i].surName;
          certificate.Age=this.certificateList[i].age;
          certificate.Dad=this.certificateList[i].dad;
          certificate.Mother=this.certificateList[i].mother;
          certificate.DateConfirmation=this.certificateList[i].dateConfirmation;
          certificate.GoodParents=this.certificateList[i].goodParents;
          certificate.Confirming=this.certificateList[i].confirming;
          certificate.Ci=this.certificateList[i].ci;
          certificate.Printed=true;
          certificate.Verified=false;
          certificate.ParishId=Number(localStorage.getItem('ParishId'));
          certificate.Baptize=this.certificateList[i].baptize;

          this.CertificateService.updateCertificate( certificate).
          subscribe(
              res=>{
              }
            )
          }
        }
        ventana?.close();
        this.ListCertificates();
   }



   Find() {
    this.PaginationService.filterData.PageNumber=1;
    this.PaginationService.Find(this.find);
    this.ListCertificates();
  }


  Quantity(PageSize: any) {
    this.optionSelect= (PageSize.target.value);
    this.PaginationService.Quantity(Number(PageSize.target.value));
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



}
