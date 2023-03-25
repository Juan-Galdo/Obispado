import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-planilla',
  templateUrl: './planilla.component.html',
  styleUrls: ['./planilla.component.css']
})
export class PlanillaComponent implements OnInit {

  constructor(private router: Router ) { }

  ngOnInit(): void {
    this.printCertificates();
  }


  printCertificates(){
    var cabecera= "<style type='text/css'> strong { padding-botton: 25px}"+
    "</style>"+
    "<div style='padding: 0px 0px 0px 20px; break-after: page'>";
    var final="</div>";
    var cuerpo="";


    for (let index = 0; index < 3; index++) {

      var cuerpo2= (

        "<table style='width:100%;height:auto; font-size: 17px;' BORDER=2>"+
        "<tr>"+
        "<th align='center'><img src='../../assets/Images/imagen.png' width='129px'></th>"+
        "</tr>"+
        "<tr>"+
                    "<td align='center'>&nbsp;&nbsp;&nbsp;Libro Nº &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
                    "&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Pagina Nº &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
                    "&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Folio Nº </td>"+
        "</tr>"+
        "<tr>"+
              "<td>"+
                "<br><strong >NOMBRES: .................................................................. EDAD: ......... CI: ..........................</strong >"+
                "<br><strong>APELLIDOS: .........................................................................................................................</strong >"+
                "<br><strong>PADRE: ...................................................................................................................................</strong >"+
                "<br><strong>MADRE: .................................................................................................................................</strong >"+
                "<br><strong>PADRINOS: ...........................................................................................................................</strong >"+
                "<br><strong>LUGAR DE BAUTISMO: ....................................................................................................</strong >"+
                "<br><strong>LUGAR DE CONFIRMACIÓN: .......................................................................................... </strong >"+
                "<br><strong>FECHA DE CONFIRMACIÓN: .......................................................................................... </strong >"+
                "<br><strong>MINISTRO CONFIRMANTE: ........................................................................................... </strong >"+
                "<br><br>"+
              "</td>"+
        "</tr>"+


      "</table>"
      );
      cuerpo = cuerpo + cuerpo2;

    }
        var ventana = window.open('');
        ventana?.document.write("<html>"+cabecera+cuerpo+final+"<html>");

        setTimeout(() => {
           ventana?.focus();
           ventana?.print();
           ventana?.close();
         }, 350);


        if(ventana?.print)
        {
         this.router.navigate(['/home']);
        }
        if(ventana?.close)
        {
         this.router.navigate(['/home']);
        }


   }


}
