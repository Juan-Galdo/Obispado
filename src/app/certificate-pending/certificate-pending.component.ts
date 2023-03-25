import { PaginationService } from './../services/pagination.service';
import { ToastrService } from 'ngx-toastr';
import { ParishService } from './../services/parish.service';
import { CertificateService } from './../services/certificate.service';
import { Component, OnInit } from '@angular/core';
import { MetaData } from '../models/metaData';

@Component({
  selector: 'app-certificate-pending',
  templateUrl: './certificate-pending.component.html',
  styleUrls: ['./certificate-pending.component.css']
})
export class CertificatePendingComponent implements OnInit {
  load: boolean= false;
  list:string[]=["5","15","30","50"];
  metaData : MetaData =  new MetaData();
  certificateList:any;
  find='';
  optionSelect:string="5";

  constructor(private CertificateService: CertificateService,
    private ParishService:ParishService,
    private toastr: ToastrService,
    private PaginationService: PaginationService,
  ) { }

  ngOnInit(): void {
    this.PaginationService.filterData.filter='';
    this.PaginationService.filterData.PageSize=5;
    this.PaginationService.filterData.PageNumber=1;
    this.ListCertificates();
  }


  ListCertificates() {
    this.load=false;
    this.CertificateService.getCertificatesPending().subscribe( response=>
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
