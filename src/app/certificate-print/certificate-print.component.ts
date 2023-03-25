import { LoginService } from './../services/login.service';
import { SignatoryService } from './../services/signatory.service';
import { PaginationService } from './../services/pagination.service';
import { ToastrService } from 'ngx-toastr';
import { ParishService } from './../services/parish.service';
import { CertificateService } from './../services/certificate.service';
import { CertificatePrint } from './../models/certificatePrint';
import { MetaData } from './../models/metaData';
import { Component, OnInit } from '@angular/core';
import { Certificate } from '../models/certificate';

@Component({
  selector: 'app-certificate-print',
  templateUrl: './certificate-print.component.html',
  styleUrls: ['./certificate-print.component.css']
})
export class CertificatePrintComponent implements OnInit {
  certificateList: CertificatePrint[] = [];
  list:string[]=["100","15","30","50"];
  parishesList: any;
  metaData : MetaData =  new MetaData();
  parish: string = "";
  parishId= Number(localStorage.getItem('ParishId'));
  Since = "";
  Until = "";
  Action = "print";
  load: boolean= false;

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
    private SignatoryService: SignatoryService,
    public LoginService :LoginService) { }

  ngOnInit(): void {
    this.PaginationService.filterData.PageSize=100;
    this.ListParishes();
  }


  ListParishes() {

          if(this.LoginService.Administrator())
          this.ParishService.getParishesAll().subscribe( response=>
            {
              this.parishesList= response.data;
            }
          )

          this.load=true;

  }

  ListCertificates() {
    this.load=false;
    this.CertificateService.getCertificateParishPrint(this.parishId, this.Since, this.Until, this.Action).subscribe( response=>
         {
           this.metaData= response.meta;
           this.certificateList= response.data;

           this.metaData.TotalPages= response.meta.totalPages;
           this.metaData.CurrentPage= response.meta.currentPage;
           this.metaData.HasNextPage = response.meta.hasNextPage;
           this.metaData.HasPreviousPage = response.meta.hasPreviousPage;

           this.ParishService.getParish(this.parishId).
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
          ventana?.document.write("<html>"+print+"<html>");

          ventana?.focus();
          ventana?.print();
          ventana?.close();

     }

  Find() {
    this.ListCertificates();
  }

  Quantity(PageSize: any) {
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


  capturer(id: string){
    this.parishId = parseInt(id);
  }

}
